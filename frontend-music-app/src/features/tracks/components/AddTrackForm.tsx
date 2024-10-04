import React, {useEffect, useState} from 'react';
import {TrackFields} from '../../../types';
import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectAlbums} from '../../albums/albumsSlice';
import {fetchAlbums} from '../../albums/albumsThunk';

interface Props {
  onSubmit: (track: TrackFields) => void;
  isLoading: boolean;
}

const AddTrackForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const [trackData, setTrackData] = useState<TrackFields>({
    album: '',
    title: '',
    trackNumber: '',
    duration: ''
  });

  const [durationError, setDurationError] = useState<string | null>(null);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setTrackData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'duration') {
      setDurationError(null);
    }
  };

  const albumInputChangeHandler = (event: SelectChangeEvent) => {
    setTrackData({...trackData, album: event.target.value});
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setDurationError('');

    const durationRegex = /^\d{1,2}:[0-5]\d$/;

    if (trackData.duration && !durationRegex.test(trackData.duration)) {
      setDurationError('Duration must be in MM:SS format (e.g., 6:34)');
      return;
    }
    onSubmit({...trackData});
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
      <Stack direction="row" alignItems="center" gap={5}>
        <Box>
          <Typography variant="body1">Album:</Typography>
        </Box>
        <FormControl>
          <Select
            id="album"
            value={trackData.album}
            label="Album"
            onChange={albumInputChangeHandler}
            sx={{width: '250px', ml: 3}}
          >
            {
              albums.map(
                (album) => (
                  <MenuItem key={album._id} value={album._id}>{album.title}</MenuItem>
                )
              )
            }
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Title:</Typography>
        </Box>
        <TextField
          label="Enter track title"
          id="title"
          name="title"
          value={trackData.title}
          onChange={inputChangeHandler}
          required
          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Track Number:</Typography>
        </Box>
        <TextField
          label="Enter track number"
          id="trackNumber"
          name="trackNumber"
          value={trackData.trackNumber}
          onChange={inputChangeHandler}
          type="number"
          required
          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Track Duration:</Typography>
        </Box>
        <TextField
          label="Enter track duration"
          id="duration"
          name="duration"
          value={trackData.duration}
          onChange={inputChangeHandler}
          error={Boolean(durationError)}
          helperText={durationError}
          fullWidth
        />
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

export default AddTrackForm;