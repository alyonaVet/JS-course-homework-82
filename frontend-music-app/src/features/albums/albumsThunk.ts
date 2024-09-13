import {createAsyncThunk} from '@reduxjs/toolkit';
import {Album} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchAlbums = createAsyncThunk<Album[], string | undefined>(
  'albums/fetchAlbums',
  async (artistId) => {
    const { data: albums } = await axiosApi.get<Album[]>(`/albums`, { params: { artist: artistId } });
    return albums;
  }
);