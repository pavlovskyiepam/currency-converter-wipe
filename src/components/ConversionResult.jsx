import React from 'react';

const ConversionResult = ({ rate, finalAmount }) => {
  return (
    <div>
      <p>Conversion Rate: {rate ? rate.toFixed(4) : 'N/A'}</p>
      <p>Final Amount: {finalAmount ? finalAmount.toFixed(2) : 'N/A'}</p>
    </div>
  );
};

export default ConversionResult;