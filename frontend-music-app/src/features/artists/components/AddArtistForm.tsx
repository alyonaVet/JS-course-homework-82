import {ArtistFields} from '../../../types';
import React, {useState} from 'react';
import {Box, Stack, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';

interface Props {
  onSubmit: (artist: ArtistFields) => void;
  isLoading: boolean
}

const AddProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {

  const [artistData, setArtistData] = useState<ArtistFields>({
    name: '',
    description: '',
    image: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setArtistData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setArtistData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({...artistData});
    setArtistData({
      name: '',
      description: '',
      image: '',
    });
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
          <Typography variant="body1">Name:</Typography>
        </Box>
        <TextField
          label="Enter artist name"
          id="name"
          name="name"
          value={artistData.name}
          onChange={inputChangeHandler}
          required
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Description:</Typography>
        </Box>
        <TextField
          label="Enter description"
          id="description"
          name="description"
          value={artistData.description}
          onChange={inputChangeHandler}
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

export default AddProductForm;