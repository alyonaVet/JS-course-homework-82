import express from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import {IArtist} from '../types';
import auth, {checkUser, RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.get('/', checkUser, async (req: RequestWithUser, res, next) => {
  try {
    const isAdmin = req.user !== undefined && req.user.role === 'admin';
    const filter = isAdmin ? {} : { isPublished: true };

    const artists = await Artist.find(filter);

    return res.send(artists);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const artistData: IArtist = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
    };

    const artist = new Artist(artistData);
    await artist.save();
    return res.send(artist);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Artist ID is not valid'});
    }

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'Artist not found'});
    }

    artist.isPublished = !artist.isPublished;

    await artist.save();

    return res.send(artist);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Artist ID is not valid'});
    }

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'Artist not found'});
    }

    await Artist.findByIdAndDelete(req.params.id);

    return res.send({message: 'Artist was deleted successfully.'});

  } catch (error) {
    return next(error);
  }
});

export default artistsRouter;