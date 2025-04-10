import React from 'react';

const FeeInput = ({ value, onChange }) => {
  return (
    <div className="fee-input">
      <label>Conversion Fee (%)</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min="0"
        max="100"
        step="0.1"
      />
    </div>
  );
};

export default FeeInput;