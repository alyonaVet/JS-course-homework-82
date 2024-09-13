import {Track} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks} from './tracksThunk';

export interface TracksState {
  tracks: Track[];
  tracksFetching: boolean;
}

const initialState: TracksState = {
  tracks: [],
  tracksFetching: false
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
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.tracksFetching,
  }
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching
} = tracksSlice.selectors;