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