import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectTracks, selectTracksFetching} from '../tracksSlice';
import {selectAlbums} from '../../albums/albumsSlice';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchTracks} from '../tracksThunk';
import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import TrackCard from './TrackCard';
import {fetchAlbums} from '../../albums/albumsThunk';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const tracks = useAppSelector(selectTracks);
  const {albumId} = useParams();
  const tracksFetching = useAppSelector(selectTracksFetching);


  useEffect(() => {
    dispatch(fetchTracks(albumId));
    dispatch(fetchAlbums());
  }, [dispatch, albumId]);

  const album = albums.find((album) => album._id === albumId);

  return (
    <Box sx={{m: 6}}>
      {tracksFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <>
          {album && (
            <Stack direction={'row'} alignItems={'center'} gap={4} sx={{mb: 5}}>
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
        </>
      )}
    </Box>);
};

export default Tracks;