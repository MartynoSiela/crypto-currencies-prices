import React, { useRef, useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, Brightness3 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

function Navbar({ colorTheme, toggleColorTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [popoverOpen, setPopoverOpen] = useState(false);
  const anchorRef = useRef(null);
  const menuItems = [
    { href: '/', displayText: 'Home' },
    { href: '/historical-prices', displayText: 'Historical Prices' },
  ];

  return (
    <AppBar position="static">
      <Toolbar className={isMobile ? '' : styles.Toolbar}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setPopoverOpen(!popoverOpen)}
              ref={anchorRef}
            >
              <MenuIcon />
            </IconButton>
            <Popover
              open={popoverOpen}
              anchorEl={anchorRef.current}
              onClose={() => setPopoverOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    onClick={() => {
                      setPopoverOpen(false);
                      navigate(item.href);
                    }}
                    key={item.href}
                  >
                    <ListItemText primary={item.displayText} />
                  </ListItem>
                ))}
              </List>
            </Popover>
          </>
        ) : (
          <>
            {menuItems.map((item) => (
              <Button color="inherit" href={item.href} key={item.href}>
                {item.displayText}
              </Button>
            ))}
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
  colorTheme: PropTypes.string.isRequired,
  toggleColorTheme: PropTypes.func.isRequired,
};

export default Navbar;
