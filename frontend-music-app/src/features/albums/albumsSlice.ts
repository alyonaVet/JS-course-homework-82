import {Album} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addAlbum, fetchAlbums} from './albumsThunk';

export interface AlbumsState {
  albums: Album[];
  albumsFetching: boolean;
  albumsCreating: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsFetching: false,
  albumsCreating: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.albumsFetching = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
        state.albumsFetching = false;
        state.albums = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.albumsFetching = false;
      });
    builder
      .addCase(addAlbum.pending, (state) => {
        state.albumsCreating = true;
      })
      .addCase(addAlbum.fulfilled, (state) => {
        state.albumsCreating = false;
      })
      .addCase(addAlbum.rejected, (state) => {
        state.albumsCreating = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumFetching: (state) => state.albumsFetching,
    selectAlbumsCreating: (state) => state.albumsCreating,
  }
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectAlbumFetching,
  selectAlbumsCreating,
} = albumsSlice.selectors;