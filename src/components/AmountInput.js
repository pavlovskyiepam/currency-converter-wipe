import React from 'react';

const AmountInput = ({ value, onChange, label }) => {
  return (
    <div className="amount-input">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min="0"
        step="0.01"
      />
    </div>
  );
};

export default AmountInput;