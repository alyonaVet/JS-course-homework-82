import React, {useEffect, useState} from 'react';
import {AlbumFields} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import {fetchArtists} from '../../artists/artistsThunk';
import {selectArtists} from '../../artists/artistsSlice';

interface Props {
  onSubmit: (album: AlbumFields) => void;
  isLoading: boolean;
}

const AddAlbumForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const dispatch = useAppDispatch();

  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const [albumData, setAlbumData] = useState<AlbumFields>({
    artist: '',
    title: '',
    date: '',
    image: ''
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setAlbumData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setAlbumData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const artistInputChangeHandler = (event: SelectChangeEvent) => {
    setAlbumData({...albumData, artist: event.target.value});
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...albumData});
  };

  return (
    <Stack
      component="form"
      onSubmit={submitFormHandler}
      display="flex"
      flexDirection="column"
      alignItems="start"
      gap={2}
      mt={3}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Title:</Typography>
        </Box>
        <TextField
          label="Enter album title"
          id="title"
          name="title"
          value={albumData.title}
          onChange={inputChangeHandler}
          required
          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Date:</Typography>
        </Box>
        <TextField
          label="Enter album date"
          id="date"
          name="date"
          value={albumData.date}
          onChange={inputChangeHandler}
          required
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="100px">
          <Typography variant="body1">Image:</Typography>
        </Box>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={5}>
        <Box>
          <Typography variant="body1">Artist:</Typography>
        </Box>
        <FormControl>
          <Select
            id="artist"
            value={albumData.artist}
            label="Artist"
            onChange={artistInputChangeHandler}
            sx={{width: '250px', ml: 3}}
          >
            {
              artists.map(
                (artist) => (
                  <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
                )
              )
            }
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" alignItems="center" mt={5}>
        <LoadingButton
          type="submit"
          disabled={isLoading}
          loadingPosition="center"
          variant="contained"
        >
          <span>create</span>
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default AddAlbumForm;