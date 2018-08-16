import React, { Component } from 'react';
import { ListGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { withContext } from '../../Store';
import DashboardItem from './DashboardItem';
import GlobalSpinner from '../global/GlobalSpinner';

class Sidebar extends Component {
  state = {
    isDropdownOpened: false,
    dashboardList: [],
    isError: false,
  };

  async componentDidMount() {
    try {
      window.addEventListener('resize', this.resize.bind(this));
      this.resize();

      this.setState({
        isLoading: true,
      });

      const dashboardList = await this.props.value.actions.getDashboardList();

      this.setState({
        isError: false,
        dashboardList: dashboardList.data.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isError: true,
      });
    }
  }

  resize() {
    this.setState({ hideSidebar: window.innerWidth < 576 });
  }

  dropdownToggle = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  };

  render() {
    const id = this.props.history.location.pathname.substr(
      this.props.history.location.pathname.lastIndexOf('/') + 1,
    );

    const dashboard = this.state.dashboardList.filter(dashboard => {
      return dashboard.dashboardId === parseInt(id, 10);
    });

    const { hideSidebar, isError } = this.state;

    return isError ? (
      <div style={{ display: 'none' }} />
    ) : hideSidebar ? (
      <div
        className={
          this.props.isSidebarHidden
            ? 'overflow-y bg-light sidebar col-sm-5 col-md-4 col-lg-3 col-xl-2'
            : 'overflow-y bg-light sidebar mt-56px col-sm-5 col-md-4 col-lg-3 col-xl-2'
        }
      >
        <Dropdown
          className="w-100 my-3"
          isOpen={this.state.isDropdownOpened}
          toggle={this.dropdownToggle}
        >
          <DropdownToggle className="btn-outline-secondary w-100" caret>
            {dashboard[0] && dashboard[0].dashboardName}
          </DropdownToggle>
          <DropdownMenu className="w-100 white-space-normal">
            {this.state.dashboardList.map(dashboard => {
              return (
                <DashboardItem
                  toggle={this.dropdownToggle}
                  key={dashboard.dashboardId}
                  dashboard={dashboard}
                  isDropdown={true}
                />
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    ) : this.state.isLoading ? (
      <div
        className={
          this.props.isSidebarHidden
            ? 'overflow-y bg-light sidebar col-sm-5 col-md-4 col-lg-3 col-xl-2'
            : 'overflow-y bg-light sidebar mt-56px col-sm-5 col-md-4 col-lg-3 col-xl-2'
        }
      >
        <GlobalSpinner />
      </div>
    ) : (
      <div
        className={
          this.props.isSidebarHidden
            ? 'overflow-y bg-light sidebar col-sm-5 col-md-4 col-lg-3 col-xl-2'
            : 'overflow-y bg-light sidebar mt-56px col-sm-5 col-md-4 col-lg-3 col-xl-2'
        }
      >
        <ListGroup className="mt-3 shadow-sm">
          {this.state.dashboardList.map(dashboard => {
            return (
              <DashboardItem
                key={dashboard.dashboardId}
                dashboard={dashboard}
              />
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default withContext(Sidebar);
