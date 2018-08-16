import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

import {
  optionsLine,
  // optionsArea,
  responsiveLine,
  drawListenerLine,
  // createListenerLine
} from '../variables/LineOptionSet';

class Line extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cycleTime) {
      return true;
    }
    return false;
  }
  render() {
    const { data } = this.props;
    const lineData = {
      labels: data.labels,
      series: [data.series],
    };
    return (
      <ChartistGraph
        data={lineData}
        type="Line"
        options={optionsLine}
        responsiveOptions={responsiveLine}
        listener={drawListenerLine}
      />
    );
  }
}

export default Line;
