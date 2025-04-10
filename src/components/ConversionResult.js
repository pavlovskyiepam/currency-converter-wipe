import React from 'react';

const ConversionResult = ({ fromCurrency, toCurrency, amount, rate, fee }) => {
  // Calculate the conversion result
  const baseResult = amount * rate;
  const feeAmount = baseResult * (fee / 100);
  const finalResult = baseResult - feeAmount;

  return (
    <div className="conversion-result">
      <div className="result-header">Conversion Result</div>
      <div className="exchange-rate">
        <span className="label">Exchange Rate:</span>
        <span className="value">
          1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
        </span>
      </div>
      <div className="conversion-details">
        <div className="detail-row">
          <span className="label">Amount:</span>
          <span className="value">
            {amount.toFixed(2)} {fromCurrency}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Converted:</span>
          <span className="value">
            {baseResult.toFixed(2)} {toCurrency}
          </span>
        </div>
        {fee > 0 && (
          <div className="detail-row">
            <span className="label">Fee ({fee}%):</span>
            <span className="value">
              -{feeAmount.toFixed(2)} {toCurrency}
            </span>
          </div>
        )}
        <div className="detail-row final">
          <span className="label">Final Amount:</span>
          <span className="value">
            {finalResult.toFixed(2)} {toCurrency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversionResult;