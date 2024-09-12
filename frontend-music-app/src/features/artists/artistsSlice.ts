import {Artist} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchArtists} from './artistsThunk';

export interface ArtistsState {
  artists: Artist[];
  isFetching: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  isFetching: false,
}

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
        state.isFetching = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectIsFetching: (state) => state.isFetching,
  }
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectIsFetching,
} = artistsSlice.selectors;