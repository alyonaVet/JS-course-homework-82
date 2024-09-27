import {Artist} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addArtist, fetchArtists} from './artistsThunk';

export interface ArtistsState {
  artists: Artist[];
  isFetching: boolean;
  artistCreating: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  isFetching: false,
  artistCreating: false,
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
    builder
      .addCase(addArtist.pending, (state) => {
        state.artistCreating = true;
      })
      .addCase(addArtist.fulfilled, (state) => {
        state.artistCreating = false;
      })
      .addCase(addArtist.rejected, (state) => {
        state.artistCreating = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectIsFetching: (state) => state.isFetching,
    selectArtistCreating: (state) => state.artistCreating,
  }
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectIsFetching,
  selectArtistCreating,
} = artistsSlice.selectors;