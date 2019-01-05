import React, { Component } from 'react';

import axios from 'axios';

import NavBar from './NavBar';
import TableWrapper from './TableWrapper';
import PlotComponent from './PlotComponent';

import SimpleTable from './SimpleTable';
import UsersTable from './UsersTable';

// import jsonData from '../data.json';

export default class DataViewer extends Component {
  state = {
    data: {
      events: []
    }
  };

  fetchData = () => {
    // import data
    // const data = JSON.parse(JSON.stringify(jsonData));
    axios
      .get('./data.json')
      .then(response =>
        this.setState({ data: response.data }, () => {
          console.log('fetched!', this.state.data);
        })
      )
      .catch(err => console.log(err.message));
  };

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <NavBar />
        <PlotComponent data={this.state.data} />
        <TableWrapper data={this.state.data} />
        <SimpleTable />
        <UsersTable />
      </div>
    );
  }
}
