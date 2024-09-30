import mongoose from 'mongoose';
import Album from './Album';
import Track from './Track';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
    required: true,
  },
  image: String,
  description: String,
});

ArtistSchema.pre('findOneAndDelete', async function (next) {
  const artistId = this.getQuery()["_id"];

  const albums = await Album.find({ artist: artistId });

  for (const album of albums) {
    await Track.deleteMany({ album: album._id });
  }

  await Album.deleteMany({ artist: artistId });

  next();
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;