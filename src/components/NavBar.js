import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Toolbar, Typography, MuiThemeProvider } from '@material-ui/core';

const styles = (theme) => ({
  navbar: {
    backgroundColor: theme.palette.primary
  }
});

class NavBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" color="default" className={classes.navbar}>
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

export default withStyles(styles)(NavBar);

