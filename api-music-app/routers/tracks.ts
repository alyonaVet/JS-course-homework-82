import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import {ITrack} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;

    const albumFilter = albumId ? {album: albumId} : {};

    const tracks = await Track.find(albumFilter).sort({trackNumber: 1});
    res.send(tracks);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.post('/', auth,  async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const trackData: ITrack = {
      album: req.body.album,
      title: req.body.title,
      trackNumber: parseInt(req.body.trackNumber),
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

tracksRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Track ID is not valid' });
    }

    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({error: 'Track not found'});
    }

    track.isPublished = !track.isPublished;

    await track.save();

    return res.send(track);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

tracksRouter.delete("/:id", auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Track ID is not valid' });
    }

    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({error: 'Track not found'});
    }

    await Track.findByIdAndDelete(req.params.id);

    return res.send({message: 'Track was deleted successfully.'});

  } catch (error) {
    return next(error);
  }
});


export default tracksRouter;