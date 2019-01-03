import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import { TablePagination, Tooltip } from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

const fields = [
  { id: 0, displayName: 'Name 1' },
  { id: 1, displayName: 'Name 2' },
  { id: 2, displayName: 'Name 3' }
];

const rows = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [13, 14, 15],
  [16, 17, 18],
  [19, 20, 21]
];

class SimpleTable extends React.Component {
  state = {
    rowsPerPage: 3,
    page: 0,
    order: 'asc',
    orderBy: 'a definir'
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSort = (orderBy, order) => {
    const newOrder = this.state.order === 'asc' ? 'desc' : 'asc';
    this.setState({ order: newOrder }, () => {});
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, order } = this.state;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          {fields &&
          fields.length > 0 && ( // only try to populate the table if fields data
              <TableHead>
                <TableRow>
                  {fields.map((field, index) => {
                    return (
                      <TableCell key={index}>
                        <Tooltip title="Sort" enterDelay={300}>
                          <TableSortLabel active={true} onClick={this.handleSort} direction={order}>
                            {field.displayName}
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            )}
          <TableBody>
            {rows.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage).map((row, index) => {
              return (
                <TableRow key={index}>
                  {fields.map((field, index) => {
                    return <TableCell key={index}>{row[field.id]}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rows.length}
                rowsPerPageOptions={[1, 3, 10]}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array,
  rows: PropTypes.array
};

export default withStyles(styles)(SimpleTable);
