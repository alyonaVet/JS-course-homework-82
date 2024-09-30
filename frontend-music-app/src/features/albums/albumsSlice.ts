import {Album} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addAlbum, deleteAlbum, fetchAlbums, togglePublishedAlbum} from './albumsThunk';

export interface AlbumsState {
  albums: Album[];
  albumsFetching: boolean;
  albumsCreating: boolean;
  albumsToggling: boolean;
  albumDeleting: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsFetching: false,
  albumsCreating: false,
  albumsToggling: false,
  albumDeleting: false,
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
    builder
      .addCase(togglePublishedAlbum.pending, (state) => {
        state.albumsToggling = true;
      })
      .addCase(togglePublishedAlbum.fulfilled, (state, {payload: publishedAlbum}) => {
        state.albumsToggling = false;
        state.albums = state.albums.map(album =>
          album._id === publishedAlbum._id ? publishedAlbum : album
        );
      })
      .addCase(togglePublishedAlbum.rejected, (state) => {
        state.albumsToggling = false;
      });
    builder
      .addCase(deleteAlbum.pending, (state, action) => {
        state.albumDeleting = true;
        state.albums = state.albums.filter(album => album._id !== action.meta.arg);
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.albumDeleting = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.albumDeleting = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumFetching: (state) => state.albumsFetching,
    selectAlbumsCreating: (state) => state.albumsCreating,
    selectAlbumToggling: (state) => state.albumsToggling,
    selectAlbumDeleting: (state) => state.albumDeleting,
  }
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectAlbumFetching,
  selectAlbumsCreating,
  selectAlbumToggling,
  selectAlbumDeleting,
} = albumsSlice.selectors;