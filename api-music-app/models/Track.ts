import mongoose, {Types} from 'mongoose';
import Album from './Album';
import TrackHistory from './TrackHistory';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist',
    }
  },
  title: {
    type: String,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
    required: true,
  },
  duration: String,
});

TrackSchema.pre('findOneAndDelete', async function (next) {
  const trackId = this.getQuery()["_id"];

  await TrackHistory.deleteMany({ track: trackId });

  next();
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;