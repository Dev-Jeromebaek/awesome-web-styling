import React, { Fragment } from 'react';
import DashboardCard from '../components/dashboard-list/DashboardCard';
import { Row, Container } from 'reactstrap';
import { withContext } from '../Store';
import GlobalSpinner from '../components/global/GlobalSpinner';
import { ErrorPage, ErrorZeroList } from '../pages';

class DashboardList extends React.Component {
  state = {
    dashboardList: [],
    isLoading: false,
    isError: false,
    errorCode: '',
    errorText: '',
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });

      const dashboardList = await this.props.value.actions.getDashboardList();
      this.setState({
        dashboardList: dashboardList.data.data,
        isLoading: false,
      });
      console.log(this.props.value.actions.getAllLocalStorage());
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.status,
        errorText: error.response.statusText,
      });
    }
  }

  render() {
    const {
      isLoading,
      dashboardList,
      isError,
      errorCode,
      errorText,
    } = this.state;
    return isError ? (
      <ErrorPage errorCode={errorCode} errorText={errorText} />
    ) : (
      <Container>
        <Row>
          {isLoading ? (
            <GlobalSpinner />
          ) : (
            <Fragment>
              {dashboardList.length !== 0 ? (
                dashboardList.map((card, index) => {
                  return (
                    <DashboardCard
                      key={card.dashboardId}
                      card={card}
                      index={index}
                    />
                  );
                })
              ) : (
                <ErrorZeroList />
              )}
            </Fragment>
          )}
        </Row>
      </Container>
    );
  }
}

export default withContext(DashboardList);
