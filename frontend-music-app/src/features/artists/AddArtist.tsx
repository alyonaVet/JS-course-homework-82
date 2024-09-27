import {Box, Typography} from '@mui/material';
import AddArtistForm from './components/AddArtistForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtistCreating} from './artistsSlice';
import {addArtist, fetchArtists} from './artistsThunk';
import {useNavigate} from 'react-router-dom';
import {ArtistFields} from '../../types';

const AddArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artistCreating = useAppSelector(selectArtistCreating);

  const submitHandler = async (artistData: ArtistFields) => {
    await dispatch(addArtist(artistData));
    await dispatch(fetchArtists());
    navigate('/');
  };

  return (
    <Box sx={{m:3}}>
      <Typography variant='h4'>Add new Artist</Typography>
      <AddArtistForm onSubmit={submitHandler} isLoading={artistCreating} />
    </Box>
  );
};

export default AddArtist;