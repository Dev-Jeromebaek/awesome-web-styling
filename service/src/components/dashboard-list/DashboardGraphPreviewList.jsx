import React from 'react';
import DashboardGraphPreview from './DashboardGraphPreview';

const DashboardGraphPreviewList = ({ dashboardGraphPreviewList }) => {
  // return dashboardGraphPreviewList.length !== 0 ? (
  //   <div>그래프가 존재하지 않습니다.</div>
  // ) : (
  return (
    <div className="d-flex flex-wrap">
      {dashboardGraphPreviewList.map(dashboardGraphPreview => {
        return (
          <DashboardGraphPreview
            dashboardGraphPreview={dashboardGraphPreview.graphSubType}
            key={dashboardGraphPreview.graphId}
          />
        );
      })}
    </div>
  );
  // );
};

export default DashboardGraphPreviewList;
