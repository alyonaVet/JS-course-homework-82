import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectTracks} from '../tracksSlice';
import {selectAlbums} from '../../albums/albumsSlice';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchTracks} from '../tracksThunk';
import {Box, Stack, Typography} from '@mui/material';
import TrackCard from './TrackCard';
import {fetchAlbums} from '../../albums/albumsThunk';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const tracks = useAppSelector(selectTracks);
  const {albumId} = useParams();

  useEffect(() => {
    dispatch(fetchTracks(albumId));
    dispatch(fetchAlbums());
  }, [dispatch, albumId]);

  const album = albums.find((album) => album._id === albumId);

  return (
    <Box sx={{m: 6}}>
      {album && (
        <Stack direction={"row"} alignItems={'center'} gap={4} sx={{mb: 5}}>
          <Typography variant="h4" component="h1">
            {album.title}
          </Typography>
          {album.artist && (
            <Typography variant="h5" component="h4">
              by {album.artist.name}
            </Typography>
          )}
        </Stack>
      )}
      <Stack direction="column" spacing={2}>
        {tracks.map((track) => (
          <TrackCard
            key={track._id}
            title={track.title}
            trackNumber={track.trackNumber}
            duration={track.duration}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Tracks;