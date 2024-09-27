import {Box, Typography} from '@mui/material';
import AddTrackForm from './components/AddTrackForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {TrackFields} from '../../types';
import {addTrack} from './tracksThunk';
import {fetchArtists} from '../artists/artistsThunk';
import {selectTracksCreating} from './tracksSlice';

const AddTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trackCreating = useAppSelector(selectTracksCreating);

  const submitHandler = async (trackData: TrackFields) => {
    await dispatch(addTrack(trackData));
    await dispatch(fetchArtists());
    navigate('/');
  };

  return (
    <Box sx={{m:3}}>
      <Typography variant='h4'>Add new Track</Typography>
      <AddTrackForm onSubmit={submitHandler} isLoading={trackCreating} />
    </Box>
  );
};

export default AddTrack;