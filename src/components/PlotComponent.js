import React, { Component } from 'react';

import Plot from 'react-plotly.js';

export default class PlotComponent extends Component {
  state = {
    x: [],
    y: []
  };

  updateState() {
    const xAxis = [];
    const yAxis = [];

    this.props.data.events.forEach(data => {
      xAxis.push(data.timestamp);
      yAxis.push(data.peak_p_max_kw);
    });

    this.setState({ x: xAxis, y: yAxis });
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateState();
    }
  }

  render() {
    return (
      <Plot
        data={[
          {
            x: this.state.x,
            y: this.state.y,
            text: ['name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7'],
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
    );
  }
}
