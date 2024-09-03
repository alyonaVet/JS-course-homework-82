import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import {ITrack} from '../types';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;

    const albumFilter = albumId ? {album: albumId} : {};
    const tracks = await Track.find(albumFilter).populate('album');
    res.send(tracks);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: ITrack = {
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration,
    };

    const track = new Track(trackData);
    await track.save();
    return res.send(track);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});


export default tracksRouter;