import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [madonnaArtist,
    michaelJacksonArtist,
    rihannaArtist] = await Artist.create({
    name: 'Madonna',
    image: 'fixtures/Madonna.jpg',
    description: 'Madonna Louise Ciccone is an American singer, songwriter, and actress.'
  }, {
    name: 'Michael Jackson',
    image: 'fixtures/MichaelJackson.jpg',
    description: 'Michael Joseph Jackson was an American singer, songwriter, dancer, and philanthropist.'
  }, {
    name: 'Rihanna',
    image: 'fixtures/Rihanna.png',
    description: 'Robyn Rihanna Fenty is a Barbadian singer, businesswoman and actress based in the United States.'
  });

  const [likeAPrayerAlbum,
    thrillerAlbum,
    unapologeticAlbum] = await Album.create({
    title: 'Like a Prayer',
    date: 'March 21, 1989',
    artist: madonnaArtist,
    image: 'fixtures/LikeAPrayer.webp',
  }, {
    title: 'Thriller',
    date: 'November 29, 1982',
    artist: michaelJacksonArtist,
    image: 'fixtures/Thriller.jpg',
  }, {
    title: 'Unapologetic',
    date: 'November 19, 2012',
    artist: rihannaArtist,
    image: 'fixtures/Unapologetic.jpeg',
  });

  await Track.create({
    title: 'Like a Prayer',
    duration: '5:41',
    album: likeAPrayerAlbum
  }, {
    title: 'Thriller',
    duration: '5:58',
    album: thrillerAlbum
  }, {
    title: 'Diamonds',
    duration: '3:45',
    album: unapologeticAlbum
  });

  const user = new User({
    username: 'user1',
    password: '12345',
  });

  user.generateToken();
  await user.save();
  await db.close();
};

run().catch(console.error);