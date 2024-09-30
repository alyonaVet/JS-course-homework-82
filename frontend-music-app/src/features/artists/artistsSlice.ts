import {Artist} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addArtist, deleteArtist, fetchArtists, togglePublishedArtist} from './artistsThunk';

export interface ArtistsState {
  artists: Artist[];
  isFetching: boolean;
  artistCreating: boolean;
  artistToggling: boolean;
  artistDeleting: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  isFetching: false,
  artistCreating: false,
  artistToggling: false,
  artistDeleting: false,
};

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
    builder
      .addCase(togglePublishedArtist.pending, (state) => {
        state.artistToggling = true;
      })
      .addCase(togglePublishedArtist.fulfilled, (state, {payload: publishedArtist}) => {
        state.artistToggling = false;
        state.artists = state.artists.map(artist =>
          artist._id === publishedArtist._id ? publishedArtist : artist
        );
      })
      .addCase(togglePublishedArtist.rejected, (state) => {
        state.artistToggling = false;
      });
    builder
      .addCase(deleteArtist.pending, (state, action) => {
        state.artistDeleting = true;
        state.artists = state.artists.filter(artist => artist._id !== action.meta.arg);
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.artistDeleting = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.artistDeleting = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectIsFetching: (state) => state.isFetching,
    selectArtistCreating: (state) => state.artistCreating,
    selectArtistToggling: (state) => state.artistToggling,
    selectArtistDeleting: (state) => state.artistDeleting,
  }
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectIsFetching,
  selectArtistCreating,
  selectArtistToggling,
  selectArtistDeleting,
} = artistsSlice.selectors;