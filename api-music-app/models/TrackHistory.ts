import mongoose, {Types} from 'mongoose';
import User from './User';
import Track from './Track';
import Album from './Album';
import Artist from './Artist';

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
      message: 'Track does not exist',
    }
  },
  trackTitle: String,
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
    validator: async (value: Types.ObjectId) => {
      const album = await Album.findById(value);
      return Boolean(album);
    },
    message: 'Album does not exist',
  },
  albumTitle: String,
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist',
    }
  },
  artistName: String,
  datetime: {
    type: Date,
    required: true,
  }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;