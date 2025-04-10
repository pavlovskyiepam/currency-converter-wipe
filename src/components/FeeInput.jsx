import React from 'react';

const FeeInput = ({ value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder="Enter fee (%)"
    />
  );
};

export default FeeInput;