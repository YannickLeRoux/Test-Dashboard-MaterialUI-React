import React, { Component } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import DraftsIcon from '@material-ui/icons/Drafts';
import DashboardIcon from '@material-ui/icons/Dashboard';


export default class Sidebar extends Component {

  render() {
    return (
        <MenuList>
        <MenuItem >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText  inset primary="Dashboard" />
        </MenuItem>
        <MenuItem >
          <ListItemIcon >
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Orders" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText inset primary="Customers" />
        </MenuItem>
      </MenuList>
    )
  }
}
