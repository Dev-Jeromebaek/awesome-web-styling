import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard, DashboardList, ErrorPage404 } from './pages';
import { WettyProvider } from './Store';
import GlobalNavbar from './components/global/GlobalNavbar';

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalNavbar />
        <WettyProvider>
          <Switch>
            <Route exact path="/" component={DashboardList} />
            <Route path="/dashboard/:dashboardId" component={Dashboard} />
            <Route component={ErrorPage404} />
          </Switch>
        </WettyProvider>
      </Fragment>
    );
  }
}

export default App;
