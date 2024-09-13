import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectArtists} from '../artistsSlice';
import {Stack} from '@mui/material';
import ArtistCard from './ArtistCard';
import {useEffect} from 'react';
import {fetchArtists} from '../artistsThunk';
import {useNavigate} from 'react-router-dom';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleCardClick = (artistId: string) => {
    navigate(`/artists/${artistId}/albums`);
  };

  return (
    <Stack direction={'row'} alignItems={'center'} mt={3} justifyContent={'center'} flexWrap={'wrap'}>
      {artists.map((artist) => (
        <ArtistCard
          key={artist._id}
          name={artist.name}
          image={artist.image}
          onClick={() => handleCardClick(artist._id)}
        />
      ))}

    </Stack>
  );
};

export default Artists;