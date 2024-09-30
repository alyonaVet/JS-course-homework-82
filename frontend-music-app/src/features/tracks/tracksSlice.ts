import {Track} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addTrack, deleteTrack, fetchTracks, togglePublishedTrack} from './tracksThunk';

export interface TracksState {
  tracks: Track[];
  tracksFetching: boolean;
  tracksCreating: boolean;
  trackToggling: boolean;
  trackDeleting: boolean;
}

const initialState: TracksState = {
  tracks: [],
  tracksFetching: false,
  tracksCreating: false,
  trackToggling: false,
  trackDeleting: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.tracksFetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
        state.tracksFetching = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.tracksFetching = false;
      });
    builder
      .addCase(addTrack.pending, (state) => {
        state.tracksCreating = true;
      })
      .addCase(addTrack.fulfilled, (state) => {
        state.tracksCreating = false;
      })
      .addCase(addTrack.rejected, (state) => {
        state.tracksCreating = false;
      });
    builder
      .addCase(togglePublishedTrack.pending, (state) => {
        state.trackToggling = true;
      })
      .addCase(togglePublishedTrack.fulfilled, (state, {payload: publishedTrack}) => {
        state.trackToggling = false;
        state.tracks = state.tracks.map(track =>
          track._id === publishedTrack._id ? publishedTrack : track
        );
      })
      .addCase(togglePublishedTrack.rejected, (state) => {
        state.trackToggling = false;
      });
    builder
      .addCase(deleteTrack.pending, (state, action) => {
        state.trackDeleting = true;
        state.tracks = state.tracks.filter(track => track._id !== action.meta.arg);
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.trackDeleting = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.trackDeleting = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.tracksFetching,
    selectTracksCreating: (state) => state.tracksCreating,
    selectTrackToggling: (state) => state.trackToggling,
    selectTrackDeleting: (state) => state.trackDeleting,
  }
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,
  selectTracksCreating,
  selectTrackToggling,
  selectTrackDeleting,
} = tracksSlice.selectors;