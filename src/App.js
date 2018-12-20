import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'

import Sidebar from './components/Sidebar';
import Graph from './components/Graph';

const styles = theme => ({
  graph: {
    backgroundColor: "#FAFAFA"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <CssBaseline />
        <Grid className="my-container" container direction="row">
          <Grid className="sidebar" item xs={3}>
            <Sidebar />
          </Grid>
          <Grid className={classes.graph} item xs={9}>
            <Graph />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
