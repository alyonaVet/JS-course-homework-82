import {createAsyncThunk} from '@reduxjs/toolkit';
import {Artist} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchArtists',
  async () => {
    const {data: artists} = await axiosApi.get('/artists');
    return artists;
  }
);