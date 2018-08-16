import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Col,
  Card,
  CardFooter,
  CardText,
  CardBody,
  CardHeader,
  Badge,
} from 'reactstrap';
import DashboardGraphPreviewList from './DashboardGraphPreviewList';

const DashboardCard = ({ card }) => {
  const isNewBadge = date => {
    const dashboardDate = new Date(date).getTime();
    const currentDate = new Date().getTime();

    if (currentDate - dashboardDate < 21600000) {
      return true;
    } else {
      return false;
    }
  };

  let isNew = false;
  if (card.graphCollectionList !== undefined) {
    card.graphCollectionList.forEach(graph => {
      if (isNewBadge(graph.updateDate)) {
        return (isNew = true);
      }
    });
  }

  return (
    <Col xs="12" sm="6" md="4" lg="3" className="mt-4">
      <NavLink
        className="text-decoration-hover-none text-dark"
        to={`/dashboard/${card.dashboardId}`}
      >
        <Card className="hover-bg-light card cursor-pointer h-100 shadow">
          <CardHeader className="font-weight-bold align-items-center d-flex">
            <div className="w-80 text-justify">{card.dashboardName}</div>
            {isNew && (
              <div className="ml-auto">
                <Badge color="danger" className=" d-flex align-items-center">
                  N
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardBody>
            <CardText className="text-justify">
              {card.dashboardDescription}
            </CardText>
          </CardBody>
          {card.graphCollectionList && (
            <CardFooter>
              <DashboardGraphPreviewList
                dashboardGraphPreviewList={card.graphCollectionList}
              />
            </CardFooter>
          )}
        </Card>
      </NavLink>
    </Col>
  );
};

export default DashboardCard;
