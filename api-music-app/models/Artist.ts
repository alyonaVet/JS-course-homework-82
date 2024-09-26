import mongoose from 'mongoose';

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

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;