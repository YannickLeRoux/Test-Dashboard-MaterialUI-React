import React, { Component } from 'react';

import NavBar from './NavBar';
import TableWrapper from './TableWrapper';
import PlotComponent from './PlotComponent';

import SimpleTable from './SimpleTable';
import UsersTable from './UsersTable';

import jsonData from '../data.json';

export default class DataViewer extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    // import data
    const data = JSON.parse(JSON.stringify(jsonData));
    console.log(data);
    this.setState({ data });
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
