import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyDropdown from './components/CurrencyDropdown';
import AmountInput from './components/AmountInput';
import FeeInput from './components/FeeInput';
import SwapButton from './components/SwapButton';
import ConversionResult from './components/ConversionResult';
import ExchangeChart from './components/ExchangeChart';
import TimeRangeSelector from './components/TimeRangeSelector';
import Loader from './components/Loader';
import { predefinedCurrencies, getExchangeRate, getHistoricalRates } from './services/currencyService';

function App() {
  // State variables
  const [currencies] = useState(predefinedCurrencies);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(1);
  const [fee, setFee] = useState(0);
  const [rate, setRate] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [timeRange, setTimeRange] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch exchange rate when currencies or time range change
  useEffect(() => {
    const fetchExchangeData = async () => {
      if (!fromCurrency || !toCurrency) return;

      setIsLoading(true);
      try {
        // Get current exchange rate
        const currentRate = await getExchangeRate(fromCurrency, toCurrency);
        setRate(currentRate);

        // Get historical data
        const historical = await getHistoricalRates(fromCurrency, toCurrency, timeRange);
        setHistoricalData(historical);

        setError('');
      } catch (error) {
        setError('Failed to fetch exchange rate data. Please try again later.');
        console.error('Error fetching exchange data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeData();
  }, [fromCurrency, toCurrency, timeRange]);

  // Handler for currency swap
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>

      <main className="converter-container">
        {error && <div className="error-message">{error}</div>}

        <div className="converter-form">
          <div className="currency-selection">
            <CurrencyDropdown
              value={fromCurrency}
              onChange={setFromCurrency}
              currencies={currencies}
              label="From Currency"
            />
            
            <SwapButton onClick={handleSwapCurrencies} />
            
            <CurrencyDropdown
              value={toCurrency}
              onChange={setToCurrency}
              currencies={currencies}
              label="To Currency"
            />
          </div>

          <div className="input-row">
            <AmountInput
              value={amount}
              onChange={setAmount}
              label="Amount"
            />
            
            <FeeInput
              value={fee}
              onChange={setFee}
            />
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="results-section">
              <ConversionResult
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                amount={amount}
                rate={rate}
                fee={fee}
              />

              <div className="chart-section">
                <TimeRangeSelector
                  selectedRange={timeRange}
                  onRangeChange={setTimeRange}
                />
                
                <ExchangeChart
                  data={historicalData}
                  fromCurrency={fromCurrency}
                  toCurrency={toCurrency}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Exchange rates provided by Currency Beacon API</p>
      </footer>
    </div>
  );
}

export default App;
