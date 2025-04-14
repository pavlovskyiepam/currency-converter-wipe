import React from 'react';

const ResultSkeleton = ({ fromCurrency = "USD", toCurrency = "EUR", fee = 0 }) => {
  return (
    <div className="conversion-result skeleton">
      <div className="result-header">Conversion Result</div>
      <div className="exchange-rate">
        <span className="label">Exchange Rate:</span>
        <span className="value">
          1 {fromCurrency} = <span className="skeleton-text currency-rate"></span> {toCurrency}
        </span>
      </div>
      <div className="conversion-details">
        <div className="detail-row">
          <span className="label">Amount:</span>
          <span className="value">
            <span className="skeleton-text amount"></span> {fromCurrency}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Converted:</span>
          <span className="value">
            <span className="skeleton-text amount"></span> {toCurrency}
          </span>
        </div>
        {fee > 0 && (
          <div className="detail-row">
            <span className="label">Fee ({fee}%):</span>
            <span className="value">
              -<span className="skeleton-text amount"></span> {toCurrency}
            </span>
          </div>
        )}
        <div className="detail-row final">
          <span className="label">Final Amount:</span>
          <span className="value">
            <span className="skeleton-text amount"></span> {toCurrency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultSkeleton;