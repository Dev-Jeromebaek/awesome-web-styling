import React from 'react';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const DashboardItem = ({
  dashboard,
  isActive,
  dashboardClick,
  isDropdown,
  toggle,
}) => {
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
  if (dashboard.graphCollectionList !== undefined) {
    dashboard.graphCollectionList.forEach(graph => {
      if (isNewBadge(graph.updateDate)) {
        return (isNew = true);
      }
    });
  }

  if (isDropdown) {
    return (
      <NavLink
        to={`/dashboard/${dashboard.dashboardId}`}
        onClick={() => {
          dashboardClick();
          toggle();
        }}
        className="white-space-normal d-flex align-items-center cursor-pointer dropdown-item dropdown-list-group-item"
      >
        <div className="w-80">{dashboard.dashboardName}</div>
        {isNew && (
          <Badge color="danger" className="ml-auto d-flex align-items-center">
            N
          </Badge>
        )}
      </NavLink>
    );
  } else {
    return (
      <NavLink
        to={`/dashboard/${dashboard.dashboardId}`}
        className={
          'cursor-pointer d-flex justify-content-between align-items-center list-group-item'
        }
        onClick={dashboardClick}
      >
        <div className="w-80">{dashboard.dashboardName}</div>
        {isNew && (
          <Badge color="danger" className="ml-auto d-flex align-items-center">
            N
          </Badge>
        )}
      </NavLink>
    );
  }
};

export default DashboardItem;
