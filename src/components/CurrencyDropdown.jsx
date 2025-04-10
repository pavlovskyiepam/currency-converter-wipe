import React from 'react';

const CurrencyDropdown = ({ value, onChange }) => {
  const currencies = ['USD', 'BRL', 'EUR', 'GBP', 'JPY']; // Add more currencies as needed

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencyDropdown;