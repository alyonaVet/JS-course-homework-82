import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectAlbumDeleting, selectAlbumFetching, selectAlbums, selectAlbumToggling} from './albumsSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {selectArtists} from '../artists/artistsSlice';
import {useEffect} from 'react';
import {deleteAlbum, fetchAlbums, togglePublishedAlbum} from './albumsThunk';
import AlbumCard from './components/AlbumCard';
import {fetchArtists} from '../artists/artistsThunk';
import {selectUser} from '../users/usersSlice';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const artists = useAppSelector(selectArtists);
  const {artistId} = useParams();
  const navigate = useNavigate();
  const albumsFetching = useAppSelector(selectAlbumFetching);
  const albumPublishToggling = useAppSelector(selectAlbumToggling);
  const albumDeleting = useAppSelector(selectAlbumDeleting);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
      dispatch(fetchArtists());
    }
  }, [dispatch, artistId]);

  const handleAlbumClick = (albumId: string) => {
    navigate(`/albums/${albumId}/tracks`);
  };


  const handleTogglePublished = async (id: string) => {
    await dispatch(togglePublishedAlbum(id));
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteAlbum(id));
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
        <Stack direction="row" flexWrap={'wrap'} gap={2}>
          {albums.map((album) => (
            <AlbumCard
              key={album._id}
              id={album._id}
              title={album.title}
              date={album.date}
              image={album.image}
              user={user}
              isPublished={album.isPublished}
              onClick={() => handleAlbumClick(album._id)}
              onToggle={() => handleTogglePublished(album._id)}
              onDelete={() => handleDelete(album._id)}
              isToggling={albumPublishToggling}
              isDeleting={albumDeleting}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Albums;