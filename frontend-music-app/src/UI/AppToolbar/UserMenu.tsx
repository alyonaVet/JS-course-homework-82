import {Avatar, Box, Button, Menu, MenuItem} from '@mui/material';
import {User} from '../../types';
import React, {useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center">
      <Avatar sx={{ backgroundColor: '#fff', color: '#8e44ad', mr: 1 }}>
        <PersonIcon />
      </Avatar>
      <Button onClick={handleClick} color="inherit">
        {user.username}
      </Button>
      <Menu anchorEl={anchorEl} open={isOpen} keepMounted onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;