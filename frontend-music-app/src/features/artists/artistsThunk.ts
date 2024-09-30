import {createAsyncThunk} from '@reduxjs/toolkit';
import {Artist, ArtistFields, GlobalError} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchArtists',
  async () => {
    const {data: artists} = await axiosApi.get<Artist[]>('/artists');
    return artists;
  }
);

export const addArtist = createAsyncThunk<void, ArtistFields, { rejectValue: GlobalError, state: RootState }>(
  'artists/addArtist',
  async (artistData, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(artistData) as (keyof ArtistFields)[];
      keys.forEach((key) => {
        const value = artistData[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post('/artists', formData);

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const togglePublishedArtist = createAsyncThunk<Artist, string, { rejectValue: GlobalError }>(
  'artists/togglePublishedArtist',
  async (id, {rejectWithValue}) => {
    try {
      const {data: artistData} = await axiosApi.patch(`/artists/${id}/togglePublished`);
      return artistData;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deleteArtist = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'artists/deleteArtist',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`/artists/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);