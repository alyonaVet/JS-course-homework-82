import {GlobalError, TrackHistory} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addTrackHistory, fetchTrackHistory} from './trackHistoryThunk';

export interface TrackHistoryState {
  trackHistory: TrackHistory[];
  trackHistoryLoading: boolean;
  trackHistoryError: GlobalError | null;

}

const initialState: TrackHistoryState = {
  trackHistory: [],
  trackHistoryLoading: false,
  trackHistoryError: null,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackHistory.pending, (state) => {
        state.trackHistoryLoading = true;
        state.trackHistoryError = null;
      })
      .addCase(addTrackHistory.fulfilled, (state) => {
        state.trackHistoryLoading = false;
        state.trackHistoryError = null;
      })
      .addCase(addTrackHistory.rejected, (state, {payload: error}) => {
        state.trackHistoryLoading = false;
        state.trackHistoryError = error || null;
      });
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.trackHistoryLoading = true;
        state.trackHistoryError = null;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, {payload: trackHistory}) => {
        state.trackHistoryLoading = false;
        state.trackHistory = trackHistory;
        state.trackHistoryError = null;
      })
      .addCase(fetchTrackHistory.rejected, (state, {payload: error}) => {
        state.trackHistoryLoading = false;
        state.trackHistoryError = error || null;
      });
  },
  selectors: {
    selectTrackHistory: (state) => state.trackHistory,
    selectTrackHistoryLoading: (state) => state.trackHistoryLoading,
    selectTrackHistoryError: (state) => state.trackHistoryError,
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const {
  selectTrackHistory,
  selectTrackHistoryLoading,
  selectTrackHistoryError,
} = trackHistorySlice.selectors;
