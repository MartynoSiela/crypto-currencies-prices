import React from 'react';
import {
  AppBar, Button, IconButton, Toolbar, useMediaQuery, useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Brightness3 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

function Navbar({ colorTheme, toggleColorTheme }) {
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
        <IconButton color="inherit" edge="end" onClick={toggleColorTheme}>
          {colorTheme === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  colorTheme: PropTypes.string,
  toggleColorTheme: PropTypes.func,
};

Navbar.defaultProps = {
  colorTheme: '',
  toggleColorTheme: null,
};

export default Navbar;
