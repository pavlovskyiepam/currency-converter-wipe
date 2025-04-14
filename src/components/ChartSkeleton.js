import React from 'react';

const ChartSkeleton = () => {
  return (
    <div className="exchange-chart skeleton">
      <h3>Exchange Rate History</h3>
      <div className="chart-skeleton">
        <div className="chart-placeholder"></div>
        <div className="axis-placeholder x-axis"></div>
        <div className="axis-placeholder y-axis"></div>
      </div>
    </div>
  );
};

export default ChartSkeleton;