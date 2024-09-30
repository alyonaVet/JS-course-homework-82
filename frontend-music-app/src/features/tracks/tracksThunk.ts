import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, Track, TrackFields} from '../../types';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';

export const fetchTracks = createAsyncThunk<Track[], string | undefined>(
  'albums/fetchTracks',
  async (albumId) => {
    const {data: tracks} = await axiosApi.get<Track[]>(`/tracks`, {params: {album: albumId}});
    return tracks;
  }
);

export const addTrack = createAsyncThunk<void, TrackFields, { rejectValue: GlobalError }>(
  'albums/addTrack',
  async (trackData, {rejectWithValue}) => {
    try {
      await axiosApi.post<TrackFields>('/tracks', trackData);

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const togglePublishedTrack = createAsyncThunk<Track, string, { rejectValue: GlobalError }>(
  'albums/togglePublishedTrack',
  async (id, {rejectWithValue}) => {
    try {
      const {data: trackData} = await axiosApi.patch(`/tracks/${id}/togglePublished`);
      return trackData;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deleteTrack = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'tracks/deleteTrack',
  async (id, {rejectWithValue}) => {
    try {
      await axiosApi.delete(`/tracks/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);