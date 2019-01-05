import React, { Component } from 'react';
import _ from 'lodash';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

//import jsonData from '../data.json';

const styles = theme => ({
  paper: {
    margin: 50
  }
});

class TableWrapper extends Component {
  state = {
    // stores data for getderivedStatefromProps
    data: this.props.data,
    tableData: []
  };

  updateState() {
    const data = this.props.data;
    const tableData = [];

    data.events.forEach(item => tableData.push([item.timestamp, item.peak_p_max_kw]));
    this.setState({ tableData });
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateState();
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.data !== prevState.data) {
  //     const tableData = [];
  //     nextProps.data.events.forEach(item => tableData.push([item.timestamp, item.peak_p_max_kw]));
  //     return { tableData };
  //   } else return null;
  // }

  renderTableRows() {
    return this.state.tableData.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableCell>Data #{index + 1}</TableCell>
          <TableCell>{row[0] * 1000}</TableCell>
          <TableCell>{row[1]}</TableCell>
        </TableRow>
      );
    });
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
                <TableCell>Time(ms)</TableCell>
                <TableCell>Peak Power Max(kW)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderTableRows()}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(TableWrapper);
