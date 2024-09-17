import {Box, Paper, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectTrackHistory} from '../trackHistorySlice';
import {useEffect} from 'react';
import {fetchTrackHistory} from '../trackHistoryThunk';
import {selectUser} from '../../users/usersSlice';
import {Navigate, } from 'react-router-dom';

const TrackHistoryPage = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to='/login'/>
  }

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  return (
    <Box sx={{m: 3}}>
      <Typography variant="h4" component="h1" gutterBottom>
        Track History
      </Typography>
      <Stack direction="column" spacing={2}>
        {trackHistory.map((track) => (
          <Paper sx={{p: 1}} key={track._id}>
            <Typography>Track: {track.trackTitle}</Typography>
            <Typography>Artist: {track.artistName}</Typography>
            <Typography>Date: {new Date(track.datetime).toLocaleString()}</Typography>
          </Paper>))
        }
      </Stack>
    </Box>
  );
};

export default TrackHistoryPage;