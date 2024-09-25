import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import React from 'react';
import {NavLink} from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ModalPlayButton: React.FC<Props> = ({open, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You should be logged in to play this track.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button component={NavLink} to="/login" color="primary">Sign in</Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPlayButton;