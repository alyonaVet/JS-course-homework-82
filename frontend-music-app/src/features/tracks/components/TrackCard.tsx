import React from 'react';
import {Box, Button, Paper, Stack, Typography} from '@mui/material';
import {User} from '../../../types';

interface Props {
  title: string;
  trackNumber: number;
  duration: string;
  user: User | null;
  isPublished: boolean;
  onToggle: VoidFunction;
  onDelete: VoidFunction;
  onPlay: () => void;
  isVisible: boolean;
  isToggling: boolean;
  isDeleting: boolean;
}

const TrackCard: React.FC<Props> = ({
                                      title,
                                      trackNumber,
                                      duration,
                                      user,
                                      isPublished,
                                      onToggle,
                                      onDelete,
                                      onPlay,
                                      isVisible,
                                      isToggling,
                                      isDeleting
                                    }) => {
  return (
    <Box>
      {user && user.role === 'admin' &&
        (<Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button sx={{cursor: 'pointer'}} color={isPublished ? 'success' : 'error'}
                    onClick={onToggle} disabled={isToggling}>{isPublished ? 'Published' : 'Unpublished'}</Button>
            <Button type="submit" variant="outlined" color="error" sx={{mr: 1}} onClick={onDelete}
                    disabled={isDeleting}>Delete</Button>
          </Stack>
        )}
      <Paper sx={{mt: 1, p: 2, mb: 1}} elevation={3}>
        <Stack direction={'row'} gap={2}>
          <Stack direction={'row'} gap={2} flexGrow={1}>
            <Typography>{trackNumber}</Typography>
            <Typography>{title}</Typography>
          </Stack>
          <Stack>
            <Stack direction={'row'} gap={2} alignItems="center">
              <Typography>{duration}</Typography>
              {isVisible && (
                <Button variant="contained" onClick={onPlay}>
                  Play
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TrackCard;