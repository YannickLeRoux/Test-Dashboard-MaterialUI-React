import React, { Component } from 'react';

import NavBar from './NavBar';
import Plot from 'react-plotly.js';
import TableWrapper from './TableWrapper';

import jsonData from '../data.json';
import SimpleTable from './SimpleTable';
import UsersTable from './UsersTable';

export default class Graph extends Component {
  state = {
    x: [],
    y: []
  };

  componentDidMount() {
    const data = JSON.parse(JSON.stringify(jsonData));

    const xAxis = [];
    const yAxis = [];

    data.events.forEach(data => {
      xAxis.push(data.timestamp);
      yAxis.push(data.peak_p_max_kw);
    });

    this.setState({ x: xAxis, y: yAxis });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Plot
          data={[
            {
              x: this.state.x,
              y: this.state.y,
              text: [
                'name1',
                'name2',
                'name3',
                'name4',
                'name5',
                'name6',
                'name7'
              ],
              type: 'scatter'
            }
          ]}
          layout={{
            width: '100%',
            height: 400,
            title: 'Peak Power Max over Time',
            paper_bgcolor: '#FAFAFA',
            xaxis: {
              title: 'Time',
              showgrid: false,
              zeroline: false
            },
            yaxis: {
              title: 'Peak Power Max (kw)',
              showline: false
            }
          }}
        />
        <TableWrapper data={this.state} />
        <SimpleTable />
        <UsersTable />
      </div>
    );
  }
}
