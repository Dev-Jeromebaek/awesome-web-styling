import React from 'react';
import pieChart from '../../public/icons/pie.svg';
import barChart from '../../public/icons/line.svg';
import lineChart from '../../public/icons/bar.svg';

const DashboardGraphPreview = ({ dashboardGraphPreview }) => {
  let temp = null;

  if (dashboardGraphPreview !== undefined) {
    switch (dashboardGraphPreview.code) {
      case 'BAR_GRAPH': {
        temp = barChart;
        break;
      }
      case 'PIE_GRAPH': {
        temp = pieChart;
        break;
      }
      default: {
        temp = lineChart;
        break;
      }
    }

    return (
      <div className="m-2 flex-grow-0 flex-shrink-0 graph-preview-width">
        <img src={temp} height="25" alt="graph" />
      </div>
    );
  }
};

export default DashboardGraphPreview;
