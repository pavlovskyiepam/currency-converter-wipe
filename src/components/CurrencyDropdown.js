import React from 'react';

const CurrencyDropdown = ({ value, onChange, currencies = [], label }) => {
  return (
    <div className="currency-dropdown">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {currencies && currencies.length > 0 ? (
          currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))
        ) : (
          <option value="">Loading currencies...</option>
        )}
      </select>
    </div>
  );
};

export default CurrencyDropdown;