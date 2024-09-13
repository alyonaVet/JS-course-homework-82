import {Album} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchAlbums} from './albumsThunk';

export interface AlbumsState {
  albums: Album[];
  albumsFetching: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsFetching: false,
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
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumFetching: (state) => state.albumsFetching,
  }
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectAlbumFetching,
} = albumsSlice.selectors;