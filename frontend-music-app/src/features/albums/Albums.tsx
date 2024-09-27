import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectAlbumFetching, selectAlbums} from './albumsSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {selectArtists} from '../artists/artistsSlice';
import {useEffect} from 'react';
import {fetchAlbums} from './albumsThunk';
import AlbumCard from './components/AlbumCard';
import {fetchArtists} from '../artists/artistsThunk';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const artists = useAppSelector(selectArtists);
  const {artistId} = useParams();
  const navigate = useNavigate();
  const albumsFetching = useAppSelector(selectAlbumFetching);


  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
      dispatch(fetchArtists());
    }
  }, [dispatch, artistId]);

  const handleAlbumClick = (albumId: string) => {
    navigate(`/albums/${albumId}/tracks`);
  };

  const artist = artists.find((artist) => artist._id === artistId);

  return (
    <Box sx={{m: 4}}>
      {artist && (
        <Typography variant="h4" component="h1" gutterBottom sx={{mb: 5}}>
          {artist.name}
        </Typography>
      )}
      {albumsFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <Stack direction="row" spacing={2}>
          {albums.map((album) => (
            <AlbumCard
              key={album._id}
              title={album.title}
              date={album.date}
              image={album.image}
              onClick={() => handleAlbumClick(album._id)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Albums;