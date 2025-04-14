import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyDropdown from './components/CurrencyDropdown';
import AmountInput from './components/AmountInput';
import FeeInput from './components/FeeInput';
import SwapButton from './components/SwapButton';
import ConversionResult from './components/ConversionResult';
import ExchangeChart from './components/ExchangeChart';
import TimeRangeSelector from './components/TimeRangeSelector';
import ResultSkeleton from './components/ResultSkeleton';
import ChartSkeleton from './components/ChartSkeleton';
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
  const [error, setError] = useState('');
  const [isCurrentRateLoading, setIsCurrentRateLoading] = useState(true);
  const [isHistoricalDataLoading, setIsHistoricalDataLoading] = useState(true);

  // Fetch current exchange rate only when currencies change
  useEffect(() => {
    const fetchCurrentRate = async () => {
      if (!fromCurrency || !toCurrency) return;

      setIsCurrentRateLoading(true);
      try {
        // Get current exchange rate
        const currentRate = await getExchangeRate(fromCurrency, toCurrency);
        setRate(currentRate);
        setError('');
      } catch (error) {
        setError('Failed to fetch current exchange rate. Please try again later.');
        console.error('Error fetching current rate:', error);
      } finally {
        setIsCurrentRateLoading(false);
      }
    };

    fetchCurrentRate();
  }, [fromCurrency, toCurrency]);

  // Fetch historical data when currencies or time range change
  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!fromCurrency || !toCurrency) return;

      setIsHistoricalDataLoading(true);
      try {
        // Get historical data
        const historical = await getHistoricalRates(fromCurrency, toCurrency, timeRange);
        setHistoricalData(historical);
        setError('');
      } catch (error) {
        setError('Failed to fetch historical data. Please try again later.');
        console.error('Error fetching historical data:', error);
      } finally {
        setIsHistoricalDataLoading(false);
      }
    };

    fetchHistoricalData();
  }, [fromCurrency, toCurrency, timeRange]);

  // Handler for currency swap
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Create a modified ResultSkeleton that accepts the current currencies
  const CurrencyAwareResultSkeleton = () => (
    <ResultSkeleton
      fromCurrency={fromCurrency}
      toCurrency={toCurrency}
      fee={fee}
    />
  );

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

          <div className="results-section">
            <div className="result-container">
              {isCurrentRateLoading ? (
                <CurrencyAwareResultSkeleton />
              ) : (
                <ConversionResult
                  fromCurrency={fromCurrency}
                  toCurrency={toCurrency}
                  amount={amount}
                  rate={rate}
                  fee={fee}
                />
              )}
            </div>

            <div className="chart-section">
              <TimeRangeSelector
                selectedRange={timeRange}
                onRangeChange={setTimeRange}
              />
              
              {isHistoricalDataLoading ? (
                <ChartSkeleton />
              ) : (
                <ExchangeChart
                  data={historicalData}
                  fromCurrency={fromCurrency}
                  toCurrency={toCurrency}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>Exchange rates provided by Currency Beacon API</p>
      </footer>
    </div>
  );
}

export default App;
