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
    musicAlbum,
    thrillerAlbum,
    dangerousAlbum,
    unapologeticAlbum,
    loudAlbum] = await Album.create({
      title: 'Like a Prayer',
      date: 1989,
      artist: madonnaArtist,
      image: 'fixtures/LikeAPrayer.webp',
    }, {
      title: 'Music',
      date: 2000,
      artist: madonnaArtist,
      image: 'fixtures/Music.png',
    }, {
      title: 'Thriller',
      date: 1982,
      artist: michaelJacksonArtist,
      image: 'fixtures/Thriller.png',
    }, {
      title: 'Dangerous',
      date: 1991,
      artist: michaelJacksonArtist,
      image: 'fixtures/dangerous.jpeg',
    }, {
      title: 'Unapologetic',
      date: 2012,
      artist: rihannaArtist,
      image: 'fixtures/Unapologetic.jpeg',
    }, {
      title: 'Loud',
      date: 2010,
      artist: rihannaArtist,
      image: 'fixtures/Loud.png',
    }
  );

  await Track.create({
    title: 'Like a Prayer',
    trackNumber: 1,
    duration: '5:41',
    album: likeAPrayerAlbum
  }, {
    title: 'Express Yourself',
    trackNumber: 2,
    duration: '4:39',
    album: likeAPrayerAlbum
  }, {
    title: 'Love Song',
    trackNumber: 3,
    duration: '4:53',
    album: likeAPrayerAlbum
  }, {
    title: 'Cherish"',
    trackNumber: 4,
    duration: '5:05',
    album: likeAPrayerAlbum
  }, {
    title: 'Spanish Eyes',
    trackNumber: 5,
    duration: '5:18',
    album: likeAPrayerAlbum
  }, {
    title: 'Impressive Instant',
    trackNumber: 1,
    duration: '3:37',
    album: musicAlbum
  }, {
    title: 'Runaway Lover',
    trackNumber: 2,
    duration: '4:46',
    album: musicAlbum
  }, {
    title: 'I Deserve It',
    trackNumber: 3,
    duration: '5:41',
    album: musicAlbum
  }, {
    title: 'Amazing',
    trackNumber: 4,
    duration: '3:43',
    album: musicAlbum
  }, {
    title: 'Music',
    trackNumber: 5,
    duration: '3:44',
    album: musicAlbum
  }, {
    title: 'Thriller',
    trackNumber: 1,
    duration: '5:58',
    album: thrillerAlbum
  }, {
    title: 'The Girl Is Mine',
    trackNumber: 2,
    duration: '3:42',
    album: thrillerAlbum
  }, {
    title: 'Billie Jean',
    trackNumber: 3,
    duration: '4:54',
    album: thrillerAlbum
  }, {
    title: 'Beat It',
    trackNumber: 4,
    duration: '4:18',
    album: thrillerAlbum
  }, {
    title: 'Human Nature"',
    trackNumber: 5,
    duration: '4:06',
    album: thrillerAlbum
  }, {
    title: 'Jam',
    trackNumber: 1,
    duration: '5:39',
    album: dangerousAlbum
  }, {
    title: 'Remember the Time',
    trackNumber: 2,
    duration: '4:01',
    album: dangerousAlbum
  }, {
    title: 'Black or White',
    trackNumber: 3,
    duration: '4:16',
    album: dangerousAlbum
  }, {
    title: 'Give In to Me"',
    trackNumber: 4,
    duration: '5:30',
    album: dangerousAlbum
  }, {
    title: 'Dangerous',
    trackNumber: 5,
    duration: '7:00',
    album: dangerousAlbum
  }, {
    title: 'Diamonds',
    trackNumber: 1,
    duration: '3:45',
    album: unapologeticAlbum
  }, {
    title: 'Stay',
    trackNumber: 2,
    duration: '3:45',
    album: unapologeticAlbum
  }, {
    title: 'Pour It Up',
    trackNumber: 3,
    duration: '3:45',
    album: unapologeticAlbum
  }, {
    title: 'Right Now',
    trackNumber: 4,
    duration: '3:45',
    album: unapologeticAlbum
  }, {
    title: 'What Now',
    trackNumber: 5,
    duration: '3:45',
    album: unapologeticAlbum
  }, {
    title: 'S&M',
    trackNumber: 1,
    duration: '4:03',
    album: loudAlbum
  }, {
    title: 'Fading',
    trackNumber: 2,
    duration: '3:19',
    album: loudAlbum
  }, {
    title: 'Man Down',
    trackNumber: 3,
    duration: '4:27',
    album: loudAlbum
  }, {
    title: 'Skin',
    trackNumber: 4,
    duration: '5:03',
    album: loudAlbum
  }, {
    title: 'Love the Way You Lie',
    trackNumber: 5,
    duration: '4:56',
    album: loudAlbum
  },);

  const user = new User({
    username: 'user1',
    password: '12345',
  });

  user.generateToken();
  await user.save();
  await db.close();
};

run().catch(console.error);