import {createAsyncThunk} from '@reduxjs/toolkit';
import {Album, AlbumFields, GlobalError} from '../../types';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';

export const fetchAlbums = createAsyncThunk<Album[], string | undefined>(
  'albums/fetchAlbums',
  async (artistId) => {
    const {data: albums} = await axiosApi.get<Album[]>(`/albums`, {params: {artist: artistId}});
    return albums;
  }
);

export const addAlbum = createAsyncThunk<void, AlbumFields, { rejectValue: GlobalError }>(
  'albums/addAlbum',
  async (albumData, {rejectWithValue}) => {
    try {
      await axiosApi.post('/albums', albumData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);