import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {IAlbum} from '../types';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const albums = await Album.find();
    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: IAlbum = {
      artist: req.body.artist,
      title: req.body.title,
      date: req.body.date,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();
    return res.send(album);

  } catch (error) {
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if (album === null) {
      return res.status(404).send({error: 'Album not found'});
    }
    return res.send(album);

  } catch (error) {
    return next(error);
  }
});

export default albumsRouter;