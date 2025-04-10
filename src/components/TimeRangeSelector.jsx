import React from 'react';

const TimeRangeSelector = ({ value, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="5d"
          checked={value === '5d'}
          onChange={(e) => onChange(e.target.value)}
        />
        Past 5 Days
      </label>
      <label>
        <input
          type="radio"
          value="1m"
          checked={value === '1m'}
          onChange={(e) => onChange(e.target.value)}
        />
        Past 1 Month
      </label>
    </div>
  );
};

export default TimeRangeSelector;