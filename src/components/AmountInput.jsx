import React from 'react';

const AmountInput = ({ value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder="Enter amount"
    />
  );
};

export default AmountInput;