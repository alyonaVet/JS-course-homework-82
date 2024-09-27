import {Track} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addTrack, fetchTracks} from './tracksThunk';

export interface TracksState {
  tracks: Track[];
  tracksFetching: boolean;
  tracksCreating: boolean;
}

const initialState: TracksState = {
  tracks: [],
  tracksFetching: false,
  tracksCreating: false,
}

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
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.tracksFetching,
    selectTracksCreating: (state) => state.tracksCreating,
  }
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,
  selectTracksCreating,
} = tracksSlice.selectors;