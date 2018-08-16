import React, { Component } from 'react';

import { Card } from '../card/Card';
import { chartDataSet } from '../variables/ChartDataSet';
import Line from '../types/Line';
import Bar from '../types/Bar';
import Pie from '../types/Pie';
import { withContext } from '../../../Store';
import { ErrorPage, ErrorWaitRenew } from '../../../pages';

import Spinner from '../../global/GlobalSpinner';
class DrawChart extends Component {
  state = {
    graphId: this.props.graphId,
    graphInfo: {},
    error: '',
    setCycle: 60,
    cycleTime: 1,
    minutes: 0,
    data: {
      labels: [],
      series: [],
    },
    legend: {
      names: [],
      types: [],
    },
    cycleTitle: '갱신 주기',
    isLoadData: false,
    isGraphNone: false,
    isError: false,
    errorCode: '',
    errorText: '',
  };

  async componentDidMount() {
    try {
      const graphInfo = await this.props.value.actions.getGraphOne(
        this.props.dashboardId,
        this.state.graphId,
      );
      this.setState(
        {
          graphInfo: graphInfo.data.data,
          isLoadData: true,
        },
        () => {
          this.updateGraphData();
          this.updateTimer = setInterval(this.proceedCycleTimer, 60000);
          // this.updateTimer = setInterval(this.proceedCycleTimer, 1000);
        },
      );
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.data.httpCode
          ? error.response.data.httpCode
          : error.response.status,
        errorText: error.response.data.exceptionMessage
          ? error.response.data.exceptionMessage
          : error.response.statusText,
      });
      clearInterval(this.updateTimer);
    }
  }

  async componentWillReceiveProps(nextProps) {
    try {
      if (this.props.layouts !== nextProps.layouts) {
        this.setState({
          isLoadData: false,
        });
        const graphInfo = await this.props.value.actions.getGraphOne(
          this.props.dashboardId,
          this.state.graphId,
        );
        this.setState(
          {
            graphInfo: graphInfo.data.data,
            isLoadData: true,
          },
          () => {
            this.updateGraphData();
          },
        );
      }
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.status,
        errorText: error.response.statusText,
      });
      clearInterval(this.updateTimer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  proceedCycleTimer = () => {
    this.setState(
      {
        cycleTime: this.state.cycleTime - 1,
        minutes: this.state.minutes + 1,
      },
      () => {
        if (
          this.state.cycleTime < 1 ||
          this.state.setCycle < this.state.minutes
        ) {
          this.updateGraphData();
          return true;
        }
      },
    );
  };

  onCycleChange = (cycleTime, newCycleTitle) => {
    this.props.value.actions.saveToLocalStorage(
      `setCycleTime-${this.state.graphId}`,
      cycleTime,
    );
    this.props.value.actions.saveToLocalStorage(
      `setCycleTitle-${this.state.graphId}`,
      newCycleTitle,
    );
    this.setState({
      setCycle: cycleTime,
      cycleTitle: newCycleTitle,
    });
  };

  onRefreshClick = () => {
    this.setState(
      {
        cycleTime: 1,
        minutes: 0,
      },
      () => {
        this.updateGraphData();
      },
    );
  };

  updateGraphData = () => {
    const { graphInfo } = this.state;
    const chartData = chartDataSet(
      graphInfo,
      this.props.value.actions.getFromLocalStorage(
        `setCycleTime-${this.state.graphId}`,
      ) || 3600,
      this.props.value.actions.getFromLocalStorage(
        `setCycleTitle-${this.state.graphId}`,
      ) || '갱신 주기',
    );
    if (chartData !== 'non Data') {
      this.setState(chartData);
    } else {
      this.setState({
        isGraphNone: true,
      });
    }
  };

  createLegend = json => {
    let legend = [];

    for (let i = 0; i < json['names'].length; i++) {
      let type = 'fa fa-circle text-' + json['types'][i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
      legend.push(' ');
    }
    return legend;
  };

  chartTypeCheck = () => {
    const { graphSubType } = this.state.graphInfo.graphType;
    if (graphSubType.code === 'LINEAR_GRAPH')
      return (
        <Line data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
    if (graphSubType.code === 'BAR_GRAPH')
      return (
        <Bar data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
    if (graphSubType.code === 'PIE_GRAPH')
      return (
        <Pie data={this.state.data} cycleTime={this.state.cycleTime === 1} />
      );
  };

  render() {
    const { graphName, dataType, baseType } = this.state.graphInfo;
    const {
      isLoadData,
      isError,
      errorCode,
      errorText,
      isGraphNone,
    } = this.state;
    return isError ? (
      <ErrorPage errorCode={errorCode} errorText={errorText} />
    ) : isLoadData ? (
      <Card
        statsIcon="fa fa-history"
        title={graphName !== undefined ? graphName : '제목'}
        category={
          dataType.title !== undefined && baseType.title !== undefined
            ? baseType.title + '별 ' + dataType.title
            : '설명'
        }
        content={
          isGraphNone ? (
            <ErrorWaitRenew />
          ) : (
            <div className="ct-chart">{this.chartTypeCheck()}</div>
          )
        }
        legend={this.createLegend(this.state.legend)}
        minutes={this.state.minutes}
        setCycle={this.onCycleChange}
        cycleTitle={this.state.cycleTitle}
        onRefresh={this.onRefreshClick}
        graphId={this.state.graphId}
      />
    ) : (
      <Spinner />
    );
  }
}

export default withContext(DrawChart);
