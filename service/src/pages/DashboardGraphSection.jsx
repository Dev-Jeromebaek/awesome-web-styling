import React, { Fragment } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'reactstrap';

import DrawChart from '../components/chart/draw/DrawChart';
// import Pagination from '../components/pagination/Pagination';
import { ErrorPage } from '../pages';

import { withContext } from '../Store';
import {
  setGridLayout,
  initGrid,
} from '../components/chart/variables/ChartLayoutSet';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardGraphSection extends React.PureComponent {
  state = {
    layout: [],
    layouts: {},
    dashboardOne: [],
    isReSized: false,
    isLoadData: false,
    isError: false,
    errorCode: '',
    errorText: '',
    pageNum: 0,
  };

  async componentDidMount() {
    initGrid();
    try {
      const dashboardOne = await this.props.value.actions.getDashboardOne(
        this.props.dashboardId,
        this.props.search.split('page=')[1],
      );
      this.setState({
        isError: false,
        dashboardOne: dashboardOne.data,
        pageNum: parseInt(this.props.search.split('page=')[1], 10),
        isLoadData: true,
        layouts: this.originalLayouts(this.props.dashboardId),
      });
    } catch (error) {
      // console.log(error.response);
      if (error.response.data.exceptionCode === '100404') {
        this.setState({
          isError: true,
          errorCode: error.response.data.exceptionCode,
          errorText: '차트가 정의되지 않았습니다.',
        });
      } else {
        this.setState({
          isError: true,
          errorCode: error.response.status,
          errorText: error.response.statusText,
        });
      }
    }
  }

  async componentWillReceiveProps(nextProps) {
    initGrid();
    try {
      if (this.props.dashboardId !== nextProps.dashboardId) {
        const dashboardOne = await this.props.value.actions.getDashboardOne(
          nextProps.dashboardId,
          nextProps.search.split('page=')[1],
        );
        this.setState({
          isError: false,
          dashboardOne: dashboardOne.data,
          pageNum: parseInt(nextProps.search.split('page=')[1], 10),
          isLoadData: true,
          layouts: this.originalLayouts(nextProps.dashboardId),
        });
      }
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.status,
        errorText: error.response.statusText,
      });
    }
  }

  originalLayouts = dashboardId => {
    initGrid();
    return (
      this.props.value.actions.getFromLocalStorage(
        `userLayout-${this.props.dashboardId}-${this.state.pageNum}`,
      ) || {}
    );
  };

  createChartList = id => {
    // 1개의 dashboard에 포함된 graphCollectionList 정보(배열)
    if (this.state.dashboardOne.length !== 0 && this.state.isLoadData) {
      const { graphCollectionList } = this.state.dashboardOne.data;
      const chartList = graphCollectionList.map(ct_info => {
        return (
          <div
            className="bg-white"
            key={ct_info.collectionId}
            data-grid={setGridLayout(ct_info)}
          >
            <DrawChart
              dashboardId={this.props.dashboardId}
              graphId={ct_info.graphId}
              key={ct_info.collectionId}
              layouts={this.state.layouts}
            />
          </div>
        );
      });
      return chartList;
    }
  };

  resetLayout = () => {
    initGrid();
    this.setState({ layouts: {} });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.value.actions.saveToLocalStorage(
      `userLayout-${this.props.dashboardId}-${this.state.pageNum}`,
      layouts,
    );
    if (window.innerWidth > 1064) {
      this.setState({
        layouts: layouts,
      });
    }
  };

  getPageNum = () => {
    return parseInt(this.props.search.split('page=')[1], 10);
  };

  render() {
    const { isLoadData, isError, errorCode, errorText } = this.state;
    return isError ? (
      <ErrorPage errorCode={errorCode} errorText={errorText} />
    ) : (
      isLoadData && (
        <Fragment>
          <div className="d-flex justify-content-between">
            {/* <Pagination
              totalSize={this.state.dashboardOne.data.totalSize}
              pageNum={this.getPageNum()}
            /> */}
            <Button
              size="sm"
              outline
              className="my-2"
              onClick={() => this.resetLayout()}
            >
              Reset Layout
            </Button>
          </div>
          <div className="clearfix" />
          <div className="bg-light ">
            <ResponsiveReactGridLayout
              className="layout"
              cols={{ lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 }}
              rowHeight={400}
              layouts={this.state.layouts}
              onLayoutChange={(layout, layouts) =>
                this.onLayoutChange(layout, layouts)
              }
            >
              {this.createChartList(this.props.dashboardId)}
            </ResponsiveReactGridLayout>
          </div>
          {/* <Pagination
            totalSize={this.state.dashboardOne.data.totalSize}
            pageNum={this.state.pageNum}
          /> */}
        </Fragment>
      )
    );
  }
}

export default withContext(DashboardGraphSection);
