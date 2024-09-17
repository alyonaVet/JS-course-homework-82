import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import {GlobalError, TrackHistory} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const addTrackHistory = createAsyncThunk<TrackHistory, string, { rejectValue: GlobalError, state: RootState }>(
  'trackHistory/addTrackToHistory',
  async (trackId, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue({error: 'You must be logged in to play a track.'});
      }

      const {data: track_history} = await axiosApi.post('/track_history', {track: trackId}, {headers: {Authorization: `Bearer ${token}`}});

      return track_history;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const fetchTrackHistory = createAsyncThunk<TrackHistory[], void, { rejectValue: GlobalError, state: RootState }>(
  'trackHistory/fetchTrackHistory',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue({error: 'You must be logged in to play a track.'});
      }
      const {data: track_history} = await axiosApi.get<TrackHistory[]>('/track_history', {headers: {Authorization: `Bearer ${token}`}});
      return track_history;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);
