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

export const togglePublishedAlbum = createAsyncThunk<Album, string, { rejectValue: GlobalError }>(
  'albums/togglePublishedAlbum',
  async (id, {rejectWithValue}) => {
    try {
      const {data: albumData} = await axiosApi.patch(`/albums/${id}/togglePublished`);
      return albumData;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deleteAlbum = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'albums/deleteAlbum',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`/albums/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);