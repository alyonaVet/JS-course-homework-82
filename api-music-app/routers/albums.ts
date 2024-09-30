import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {IAlbum} from '../types';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import Artist from '../models/Artist';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;

    const artistFilter = artistId ? {artist: artistId} : {};

    const albums = await Album.find(artistFilter).sort({date: -1}).populate('artist', 'name');
    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const albumData: IAlbum = {
      artist: req.body.artist,
      title: req.body.title,
      date: parseInt(req.body.date),
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();
    return res.send(album);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Album ID is not valid'});
    }
    const album = await Album.findById(req.params.id).populate('artist');

    if (album === null) {
      return res.status(404).send({error: 'Album not found'});
    }

    return res.send(album);

  } catch (error) {
    return next(error);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Album ID is not valid'});
    }
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({error: 'Album not found'});
    }

    album.isPublished = !album.isPublished;

    await album.save();

    return res.send(album);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({error: 'Album ID is not valid'});
    }

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({error: 'Album not found'});
    }

    await Album.findByIdAndDelete(req.params.id);

    return res.send({message: 'Album was deleted successfully.'});

  } catch (error) {
    return next(error);
  }
});

export default albumsRouter;