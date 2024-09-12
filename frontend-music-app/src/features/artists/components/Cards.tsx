import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectArtists} from '../artistsSlice';
import {Stack} from '@mui/material';
import ArtistCard from './ArtistCard';
import {useEffect} from 'react';
import {fetchArtists} from '../artistsThunk';

const Cards = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Stack direction={'row'} alignItems={'center'} mt={3} justifyContent={'center'} flexWrap={'wrap'}>
      {artists.map((artist) => (
        <ArtistCard
          key={artist._id}
          name={artist.name}
          image={artist.image}
        />
      ))}

    </Stack>
  );
};

export default Cards;