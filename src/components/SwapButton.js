import React from 'react';

const SwapButton = ({ onClick }) => {
  return (
    <button className="swap-button" onClick={onClick}>
      <span role="img" aria-label="swap">🔄</span> Swap
    </button>
  );
};

export default SwapButton;