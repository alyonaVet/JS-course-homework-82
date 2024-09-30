import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtistDeleting, selectArtists, selectArtistToggling, selectIsFetching} from './artistsSlice';
import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import ArtistCard from './components/ArtistCard';
import {useEffect} from 'react';
import {deleteArtist, fetchArtists, togglePublishedArtist} from './artistsThunk';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../users/usersSlice';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const navigate = useNavigate();
  const artistsFetching = useAppSelector(selectIsFetching);
  const artistPublishToggling = useAppSelector(selectArtistToggling);
  const artistDeleting = useAppSelector(selectArtistDeleting);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleCardClick = (artistId: string) => {
    navigate(`/artists/${artistId}/albums`);
  };

  const handleTogglePublished = async (id: string) => {
    await dispatch(togglePublishedArtist(id));
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteArtist(id));
  };

  return (
    <Box sx={{m: 4}}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Artists
      </Typography>
      {artistsFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} gap={3}>
          {artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              id={artist._id}
              name={artist.name}
              image={artist.image}
              user={user}
              isPublished={artist.isPublished}
              onToggle={() => handleTogglePublished(artist._id)}
              onDelete={() => handleDelete(artist._id)}
              onClick={() => handleCardClick(artist._id)}
              isToggling={artistPublishToggling}
              isDeleting={artistDeleting}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Artists;