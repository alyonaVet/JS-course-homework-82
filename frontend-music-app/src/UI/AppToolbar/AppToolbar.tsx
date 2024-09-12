import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const AppToolbar = () => {
  return (
    <Box sx={{flexGrow: 1, m: 0}}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(45deg, #8e44ad, #3498db)' }}>
        <Toolbar>
          <NavLink to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Music App
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;