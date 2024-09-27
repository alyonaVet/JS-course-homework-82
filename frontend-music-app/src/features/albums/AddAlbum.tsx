import {Box, Typography} from '@mui/material';
import AddAlbumForm from './components/AddAlbumForm';
import {AlbumFields} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addAlbum} from './albumsThunk';
import {fetchArtists} from '../artists/artistsThunk';
import {useNavigate} from 'react-router-dom';
import {selectAlbumsCreating} from './albumsSlice';

const AddAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const albumCreating = useAppSelector(selectAlbumsCreating);

  const submitHandler = async (albumData: AlbumFields) => {
      await dispatch(addAlbum(albumData));
      await dispatch(fetchArtists());
      navigate('/');
  };

  return (
    <Box sx={{m:3}}>
      <Typography variant='h4'>Add new Album</Typography>
      <AddAlbumForm onSubmit={submitHandler} isLoading={albumCreating} />
    </Box>
  );
};

export default AddAlbum;