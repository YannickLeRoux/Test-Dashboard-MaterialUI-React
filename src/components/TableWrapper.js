import React, { Component } from 'react';
import _ from 'lodash';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles'

import jsonData from '../data.json';

const styles = theme => ({
  paper: {
    margin: 20
  }
});

class TableWrapper extends Component {

  state = {
    tableData: []
  };

  componentWillMount() {
    let tableData = [];
    const data = JSON.parse(JSON.stringify(jsonData));

    data.events.forEach( item => tableData.push([ item.timestamp, item.peak_p_max_kw ]));
    this.setState({ tableData });
    console.log('new state', this.state )
  }

  renderTableRows() {
    return this.state.tableData.map( row => {
      return (
        <TableRow>
          <TableCell>Data Name</TableCell>
          <TableCell>{ row[0] }</TableCell>
          <TableCell>{ row[1] }</TableCell>
        </TableRow>
      );
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test #</TableCell>
              <TableCell>My X Values</TableCell>
              <TableCell>My Y Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.renderTableRows() }
          </TableBody>
        </Table>

        </Paper>

      </div>
    )
  }
}

export default withStyles(styles)(TableWrapper);
