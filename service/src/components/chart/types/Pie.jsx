import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

import {
  // optionSimplePie,
  optionDonutPie,
  drawListenerPie,
  // createListenerPie
} from '../variables/PieOptionSet';

class Pie extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cycleTime) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <ChartistGraph
        data={this.props.data}
        type="Pie"
        options={optionDonutPie(this.props.data)}
        listener={drawListenerPie}
      />
    );
  }
}

export default Pie;
