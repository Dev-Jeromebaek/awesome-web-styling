import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardGraphSection from '../pages/DashboardGraphSection';
import { ErrorPage } from '../pages';

class Dashboard extends Component {
  state = {
    dashboardId: parseInt(this.props.match.params.dashboardId, 10),
    isLoadPage: false,
    isSidebarHidden: false,
    isError: false,
    errorCode: '',
    errorText: '',
  };

  changeDashBoard = id => {
    this.setState({
      isLoadPage: false,
    });
    this.setState({
      dashboardId: id,
      isLoadPage: true,
    });
  };

  async componentDidMount() {
    try {
      this.setState({
        isError: false,
      });
      await window.addEventListener('resize', this.resize.bind(this));
      this.resize();
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.status,
        errorText: error.response.statusText,
      });
    }
  }

  resize() {
    this.setState({ isSidebarHidden: window.innerWidth < 578 });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.dashboardId !== nextProps.match.params.dashboardId
    ) {
      this.setState({
        dashboardId: parseInt(nextProps.match.params.dashboardId, 10),
      });
    }
  }
  render() {
    return this.state.isError ? (
      <ErrorPage
        errorCode={this.state.errorCode}
        errorText={this.state.errorMessage}
      />
    ) : (
      <Container fluid>
        <Row>
          <Sidebar
            history={this.props.history}
            dashboardId={this.state.dashboardId}
            changeDashBoard={this.changeDashBoard}
            isSidebarHidden={this.state.isSidebarHidden}
          />
          <div className="ml-auto col-sm-7 col-md-8 col-lg-9 col-xl-10">
            <DashboardGraphSection
              dashboardId={this.state.dashboardId}
              search={this.props.location.search}
            />
          </div>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
