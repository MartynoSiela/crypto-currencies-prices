import React from 'react';
import {
  AppBar, Button, IconButton, Toolbar, useMediaQuery, useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styles from './Navbar.module.css';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar className={isMobile ? '' : styles.Toolbar}>
        {isMobile ? (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/historical-prices">Historical Prices</Button>
          </>

        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
