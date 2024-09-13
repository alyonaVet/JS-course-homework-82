import React from 'react';
import {Paper, Stack, Typography} from '@mui/material';

interface Props {
  title: string;
  trackNumber: number;
  duration: string;
}

const TrackCard: React.FC<Props> = ({title, trackNumber, duration}) => {
  return (
    <Paper sx={{p: 1, mt: 2, padding: 2}} elevation={3}>
      <Stack direction={'row'} gap={2}>
        <Stack direction={'row'} gap={2} flexGrow={1}>
          <Typography>{trackNumber}</Typography>
          <Typography>{title}</Typography>
        </Stack>
        <Stack>
          <Typography>{duration}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TrackCard;