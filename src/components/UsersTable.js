import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TablePagination, TableFooter } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 5
  },
  filterButton: {
    margin: theme.spacing.unit * 3,
    backgroundColor: 'orange'
  },

  resetButton: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    backgroundColor: 'blue',
    color: 'white'
  }
});

class UsersTable extends React.Component {

  state = {
    userData: [],
    page: 0,
    rowsPerPage: 5
  };

  componentWillMount() {
    this.resetTable();
  }

  resetTable = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then( res => res.json())
      .then( userData => this.setState({ userData }));
  }

  // filters out names not starting with C
  filterNames = () => {
    const filteredUsers = this.state.userData.filter( user => user.name[0].toLowerCase() === 'c')
    this.setState({ userData: filteredUsers })
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  };

  render() {
    const { classes } = this.props;
    const { userData, page, rowsPerPage } = this.state;
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*here it slice data according to nb of rows and page */}
            { userData.slice(page * rowsPerPage, page* rowsPerPage + rowsPerPage ).map(user => {
              return (
                <TableRow key={ user.id }>
                  <TableCell>{ user.name }</TableCell>
                  <TableCell>{ user.email }</TableCell>
                  <TableCell>{ user.company.name }</TableCell>
                </TableRow>

              );
            })
          }
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 25]}
              count={userData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
        <Button
          onClick={this.filterNames}
          className={classes.filterButton}
          color="primary"
          variant="text"
          >
          Whose name starting with a C?
        </Button>
        <Button
          onClick={this.resetTable}
          className={classes.resetButton}
          color="secondary"
          variant="text"
          >
          Reset Users Table
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(UsersTable);
