import React from 'react';
import {Button, Paper, Stack, Typography} from '@mui/material';

interface Props {
  title: string;
  trackNumber: number;
  duration: string;
  onPlay: () => void;
}

const TrackCard: React.FC<Props> = ({title, trackNumber, duration, onPlay}) => {
  return (
    <Paper sx={{p: 1, mt: 2, padding: 2}} elevation={3}>
      <Stack direction={'row'} gap={2}>
        <Stack direction={'row'} gap={2} flexGrow={1}>
          <Typography>{trackNumber}</Typography>
          <Typography>{title}</Typography>
        </Stack>
        <Stack>
          <Stack direction={'row'} gap={2} alignItems="center">
            <Typography>{duration}</Typography>
            <Button variant="contained" onClick={onPlay}>Play</Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TrackCard;