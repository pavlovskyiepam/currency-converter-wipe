import React from 'react';

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
  return (
    <div className="time-range-selector">
      <div className="range-header">Historical Data</div>
      <div className="range-options">
        <button 
          className={selectedRange === 5 ? 'active' : ''} 
          onClick={() => onRangeChange(5)}
        >
          5 Days
        </button>
        <button 
          className={selectedRange === 30 ? 'active' : ''} 
          onClick={() => onRangeChange(30)}
        >
          1 Month
        </button>
      </div>
    </div>
  );
};

export default TimeRangeSelector;