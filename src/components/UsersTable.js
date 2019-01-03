import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Input from '@material-ui/core/Input';
import SortingTableCell from './SortingTableCell';
import {
  TablePagination,
  TableFooter,
  FormControl,
  InputLabel,
  InputAdornment
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { CSVLink } from 'react-csv';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 5
  },

  filterButton: {
    margin: theme.spacing.unit * 3,
    backgroundColor: 'orange'
  },

  margin: {
    margin: theme.spacing.unit
  },

  resetButton: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    backgroundColor: 'blue',
    color: 'white'
  }
});

const SortTableCell = props => {
  return (
    <TableCell>
      <Tooltip title="Sort" enterDelay={300}>
        <TableSortLabel direction={props.direction} onClick={props.onClick}>
          {props.children}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

class UsersTable extends React.Component {
  state = {
    userData: [],
    filteredData: [],
    page: 0,
    rowsPerPage: 5,
    searchTerm: '',
    direction: 'asc',
    orderBy: ''
  };

  componentWillMount() {
    this.fetchData();
  }

  resetTable = () => {
    this.setState({ filteredData: this.state.userData });
  };

  fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(userData => {
        this.setState({ userData });
        this.setState({ filteredData: userData });
      });
  };

  // filters out names not starting with C
  filterNames = () => {
    const filteredData = this.state.userData.filter(user => user.name[0].toLowerCase() === 'c');
    this.setState({ filteredData });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSearch = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      const filteredData = this.state.userData.filter(user => {
        return (
          user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
          user.company.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        );
      });
      this.setState({ filteredData });
    });
  };

  handleSort = columnToSort => () => {
    const newDirection = this.state.direction === 'asc' ? 'desc' : 'asc';
    this.setState({ orderBy: columnToSort });
    this.setState({ direction: newDirection }, () => {
      const newOrder = orderBy(this.state.filteredData, this.state.orderBy, this.state.direction);
      this.setState({ filteredData: newOrder });
    });
  };

  render() {
    const { classes } = this.props;
    const { userData, filteredData, page, rowsPerPage, searchTerm, direction } = this.state;
    return (
      <Paper className={classes.root}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="search-field-input">Search: </InputLabel>
          <Input
            value={searchTerm}
            onChange={this.handleSearch}
            id="search-field-input"
            placeholder="Search..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Table>
          <TableHead>
            <TableRow>
              <SortingTableCell
                active={this.state.orderBy === 'name'}
                direction={direction}
                onClick={this.handleSort('name')}
              >
                Name
              </SortingTableCell>
              <SortingTableCell
                active={this.state.orderBy === 'email'}
                direction={direction}
                onClick={this.handleSort('email')}
              >
                Email
              </SortingTableCell>
              <SortingTableCell
                active={this.state.orderBy === 'company.name'}
                direction={direction}
                onClick={this.handleSort('company.name')}
              >
                Company
              </SortingTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*here it slice data according to nb of rows and page */}
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                </TableRow>
              );
            })}
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
        {/*<Button
          onClick={this.filterNames}
          className={classes.filterButton}
          color="primary"
          variant="text"
        >
          Whose name starting with a C?
        </Button> */}
        <Button
          onClick={this.resetTable}
          className={classes.resetButton}
          color="secondary"
          variant="text"
        >
          Reset Users Table
        </Button>
        <Button>
          <CSVLink data={filteredData}>Download CSV File</CSVLink>
        </Button>
      </Paper>
    );
  }
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(UsersTable);
