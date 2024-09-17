import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import User from '../models/User';
import Track from '../models/Track';
import Album from '../models/Album';
import Artist from '../models/Artist';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res.status(401).send({error: 'Header "Authorization" not found!'});
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({error: 'Token not found!'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Wrong Token!'});
    }

    const trackId = req.body.track;

    if (!trackId) {
      return res.status(400).send({error: 'Track ID is required!'});
    }

    const track = await Track.findById(trackId);


    if (!track) {
      return res.status(404).send({error: 'Track not found!'});
    }

    const album = await Album.findById(track.album);

    if (!album) {
      return res.status(404).send({error: 'Album not found!'});
    }

    const artist = await Artist.findById(album.artist);

    if (!artist) {
      return res.status(404).send({error: 'Artist not found!'});
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: track._id,
      trackTitle: track.title,
      album: album._id,
      albumTitle: album.title,
      artist: artist._id,
      artistName: artist.name,
      datetime: new Date(),
    });

    await trackHistory.save();
    return res.send(trackHistory);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

trackHistoryRouter.get('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res.status(401).send({error: 'Header "Authorization" not found!'});
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({error: 'Token not found!'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Invalid token!'});
    }

    const trackHistories = await TrackHistory.find({user: user._id}).sort({datetime: -1});

    return res.send(trackHistories);

  } catch (error) {
    return next(error);
  }
});


export default trackHistoryRouter;