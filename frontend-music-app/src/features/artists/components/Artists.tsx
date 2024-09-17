import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectArtists, selectIsFetching} from '../artistsSlice';
import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import ArtistCard from './ArtistCard';
import {useEffect} from 'react';
import {fetchArtists} from '../artistsThunk';
import {useNavigate} from 'react-router-dom';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const navigate = useNavigate();
  const artistsFetching = useAppSelector(selectIsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleCardClick = (artistId: string) => {
    navigate(`/artists/${artistId}/albums`);
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
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'}>
          {artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              name={artist.name}
              image={artist.image}
              onClick={() => handleCardClick(artist._id)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Artists;