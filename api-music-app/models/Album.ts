import mongoose, {Types} from 'mongoose';
import Artist from './Artist';
import Track from './Track';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist',
    }
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
    required: true,
  },
  image: String,
});

AlbumSchema.pre('findOneAndDelete', async function (next) {
  const albumId = this.getQuery()["_id"];

  await Track.deleteMany({ album: albumId });

  next();
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
