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
    rihannaArtist, eminemArtist] = await Artist.create({
    name: 'Madonna',
    image: 'fixtures/Madonna.jpg',
    description: 'Madonna Louise Ciccone is an American singer, songwriter, and actress.',
    isPublished: true,
  }, {
    name: 'Michael Jackson',
    image: 'fixtures/MichaelJackson.jpg',
    description: 'Michael Joseph Jackson was an American singer, songwriter, dancer, and philanthropist.',
    isPublished: true,
  }, {
    name: 'Rihanna',
    image: 'fixtures/Rihanna.png',
    description: 'Robyn Rihanna Fenty is a Barbadian singer, businesswoman and actress based in the United States.',
    isPublished: true,
  }, {
    name: 'Eminem',
    image: 'fixtures/Eminem.webp',
    description: 'Marshall Bruce Mathers III, known professionally as Eminem, is an American rapper, songwriter, and record producer.',
    isPublished: false,
  },);

  const [likeAPrayerAlbum,
    musicAlbum,
    thrillerAlbum,
    dangerousAlbum,
    unapologeticAlbum,
    loudAlbum, slimShadyAlbum] = await Album.create({
      title: 'Like a Prayer',
      date: 1989,
      artist: madonnaArtist,
      image: 'fixtures/LikeAPrayer.webp',
      isPublished: true,
    }, {
      title: 'Music',
      date: 2000,
      artist: madonnaArtist,
      image: 'fixtures/Music.png',
      isPublished: true,
    }, {
      title: 'Thriller',
      date: 1982,
      artist: michaelJacksonArtist,
      image: 'fixtures/Thriller.png',
      isPublished: true,
    }, {
      title: 'Dangerous',
      date: 1991,
      artist: michaelJacksonArtist,
      image: 'fixtures/dangerous.jpeg',
      isPublished: true,
    }, {
      title: 'Unapologetic',
      date: 2012,
      artist: rihannaArtist,
      image: 'fixtures/Unapologetic.jpeg',
      isPublished: true,
    }, {
      title: 'Loud',
      date: 2010,
      artist: rihannaArtist,
      image: 'fixtures/Loud.png',
      isPublished: true,
    }, {
      title: 'The Slim Shady LP',
      date: 1999,
      artist: eminemArtist,
      image: 'fixtures/SlimShady.jpeg',
      isPublished: false,
    }
  );

  await Track.create({
      title: 'Like a Prayer',
      trackNumber: 1,
      duration: '5:41',
      album: likeAPrayerAlbum,
      isPublished: true,
    }, {
      title: 'Express Yourself',
      trackNumber: 2,
      duration: '4:39',
      album: likeAPrayerAlbum,
      isPublished: true,
    }, {
      title: 'Love Song',
      trackNumber: 3,
      duration: '4:53',
      album: likeAPrayerAlbum,
      isPublished: true,
    }, {
      title: 'Cherish',
      trackNumber: 4,
      duration: '5:05',
      album: likeAPrayerAlbum,
      isPublished: true,
    }, {
      title: 'Spanish Eyes',
      trackNumber: 5,
      duration: '5:18',
      album: likeAPrayerAlbum,
      isPublished: true,
    }, {
      title: 'Impressive Instant',
      trackNumber: 1,
      duration: '3:37',
      album: musicAlbum,
      isPublished: true,
    }, {
      title: 'Runaway Lover',
      trackNumber: 2,
      duration: '4:46',
      album: musicAlbum,
      isPublished: true,
    }, {
      title: 'I Deserve It',
      trackNumber: 3,
      duration: '5:41',
      album: musicAlbum,
      isPublished: true,
    }, {
      title: 'Amazing',
      trackNumber: 4,
      duration: '3:43',
      album: musicAlbum,
      isPublished: true,
    }, {
      title: 'Music',
      trackNumber: 5,
      duration: '3:44',
      album: musicAlbum,
      isPublished: true,
    }, {
      title: 'Thriller',
      trackNumber: 1,
      duration: '5:58',
      album: thrillerAlbum,
      isPublished: true,
    }, {
      title: 'The Girl Is Mine',
      trackNumber: 2,
      duration: '3:42',
      album: thrillerAlbum,
      isPublished: true,
    }, {
      title: 'Billie Jean',
      trackNumber: 3,
      duration: '4:54',
      album: thrillerAlbum,
      isPublished: true,
    }, {
      title: 'Beat It',
      trackNumber: 4,
      duration: '4:18',
      album: thrillerAlbum,
      isPublished: true,
    }, {
      title: 'Human Nature',
      trackNumber: 5,
      duration: '4:06',
      album: thrillerAlbum,
      isPublished: true,
    }, {
      title: 'Jam',
      trackNumber: 1,
      duration: '5:39',
      album: dangerousAlbum,
      isPublished: true,
    }, {
      title: 'Remember the Time',
      trackNumber: 2,
      duration: '4:01',
      album: dangerousAlbum,
      isPublished: true,
    }, {
      title: 'Black or White',
      trackNumber: 3,
      duration: '4:16',
      album: dangerousAlbum,
      isPublished: true,
    }, {
      title: 'Give In to Me',
      trackNumber: 4,
      duration: '5:30',
      album: dangerousAlbum,
      isPublished: true,
    }, {
      title: 'Dangerous',
      trackNumber: 5,
      duration: '7:00',
      album: dangerousAlbum,
      isPublished: true,
    }, {
      title: 'Diamonds',
      trackNumber: 1,
      duration: '3:45',
      album: unapologeticAlbum,
      isPublished: true,
    }, {
      title: 'Stay',
      trackNumber: 2,
      duration: '3:45',
      album: unapologeticAlbum,
      isPublished: true,
    }, {
      title: 'Pour It Up',
      trackNumber: 3,
      duration: '3:45',
      album: unapologeticAlbum,
      isPublished: true,
    }, {
      title: 'Right Now',
      trackNumber: 4,
      duration: '3:45',
      album: unapologeticAlbum,
      isPublished: true,
    }, {
      title: 'What Now',
      trackNumber: 5,
      duration: '3:45',
      album: unapologeticAlbum,
      isPublished: true,
    }, {
      title: 'S&M',
      trackNumber: 1,
      duration: '4:03',
      album: loudAlbum,
      isPublished: true,
    }, {
      title: 'Fading',
      trackNumber: 2,
      duration: '3:19',
      album: loudAlbum,
      isPublished: true,
    }, {
      title: 'Man Down',
      trackNumber: 3,
      duration: '4:27',
      album: loudAlbum,
      isPublished: true,
    }, {
      title: 'Skin',
      trackNumber: 4,
      duration: '5:03',
      album: loudAlbum,
      isPublished: true,
    }, {
      title: 'Love the Way You Lie',
      trackNumber: 5,
      duration: '4:56',
      album: loudAlbum,
      isPublished: true,
    }, {
      title: 'My Name Is',
      trackNumber: 1,
      duration: '4:28',
      album: slimShadyAlbum,
      isPublished: false,
    }, {
      title: 'Role Model',
      trackNumber: 2,
      duration: '3:25',
      album: slimShadyAlbum,
      isPublished: false,
    }, {
      title: 'Guilty Conscience',
      trackNumber: 3,
      duration: '3:19',
      album: slimShadyAlbum,
      isPublished: false,
    },
  );

  await User.create({
      username: 'admin',
      password: 'zxC1@3',
      token: crypto.randomUUID(),
      role: 'admin',
    }, {
      username: 'user1',
      password: '12#Asd',
      token: crypto.randomUUID(),
      role: 'user',
    }
  );

  await db.close();
};

run().catch(console.error);