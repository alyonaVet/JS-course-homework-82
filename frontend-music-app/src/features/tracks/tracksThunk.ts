import {createAsyncThunk} from '@reduxjs/toolkit';
import {Track} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracks = createAsyncThunk<Track[], string | undefined>(
  'albums/fetchTracks',
  async (albumId) => {
    const {data: tracks} = await axiosApi.get<Track[]>(`/tracks`, {params: {album: albumId}});
    return tracks;
  }
);