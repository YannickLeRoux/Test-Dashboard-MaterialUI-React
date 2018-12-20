import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem, Toolbar, Typography, MuiThemeProvider } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';

export default class NavBar extends Component {
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton aria-label="Menu">
            <MenuIcon style={{ color: 'white'}} />
          </IconButton>
          <Typography variant="h6" color="inherit">
              My Menu
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

