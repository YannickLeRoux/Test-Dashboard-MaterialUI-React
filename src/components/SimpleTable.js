import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import { TablePagination } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const fields = [
  { id: 0, displayName: 'Name 1'},
  { id: 1, displayName: 'Name 2'},
  { id: 2, displayName: 'Name 3'},
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

function SimpleTable(props) {
  //const { classes, fields, rows } = props;
  const { classes } = props;

  return (
    <Paper className={classes.root}>
        <Table className={classes.table}>
          { fields &&
            fields.length > 0 && (       // only try to populate the table if fields data
              <TableHead>
                <TableRow>
                  {fields.map((field, index) => {
                    return <TableCell key={index}>{field.displayName}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
            )}
          <TableBody>
            {rows.map((row, index) => {
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
            <TablePagination
              count={3}
              rowsPerPageOptions={[3]}
              rowsPerPage={3}
              component="div"
              r
            />

          </TableFooter>
        </Table>

    </Paper>
  );
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array,
  rows: PropTypes.array
};

export default withStyles(styles)(SimpleTable);