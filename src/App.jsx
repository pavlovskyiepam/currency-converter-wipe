import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CurrencyDropdown from './components/CurrencyDropdown';
import AmountInput from './components/AmountInput';
import FeeInput from './components/FeeInput';
import SwapButton from './components/SwapButton';
import ConversionResult from './components/ConversionResult';
import ExchangeChart from './components/ExchangeChart';
import TimeRangeSelector from './components/TimeRangeSelector';

const App = () => {
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('BRL');
  const [amount, setAmount] = useState(1);
  const [fee, setFee] = useState(0);
  const [conversionRate, setConversionRate] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [timeRange, setTimeRange] = useState('5d');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;

  useEffect(() => {
    const fetchConversionRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.currencybeacon.com/v1/convert`, {
          params: {
            from: sourceCurrency,
            to: targetCurrency,
            amount: 1,
            api_key: API_KEY,
          },
        });
        if (response.data.meta && response.data.meta.error) {
          console.error('API Error:', response.data.meta.error);
        }
        const rate = response.data.response?.value; // Use 'value' instead of 'rate'
        if (rate) {
          setConversionRate(rate);
        } else {
          throw new Error('Value not found in response');
        }
      } catch (err) {
        console.error('Error fetching conversion rate:', err);
        setError('Failed to fetch conversion rate.');
      } finally {
        setLoading(false);
      }
    };

    fetchConversionRate();
  }, [sourceCurrency, targetCurrency]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      setError(null);
      try {
        const today = new Date();
        const range = timeRange === '5d' ? 5 : 30;
        const dates = Array.from({ length: range }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return date.toISOString().split('T')[0];
        });

        const promises = dates.map(async (date) => {
          const response = await axios.get(`https://api.currencybeacon.com/v1/historical`, {
            params: {
              base: sourceCurrency,
              symbols: targetCurrency,
              date,
              api_key: API_KEY,
            },
          });
          return { date, rate: response.data.response?.rates?.[targetCurrency] };
        });

        const results = await Promise.all(promises);
        const filteredResults = results.filter((entry) => entry.rate !== undefined);

        if (filteredResults.length === 0) {
          setHistoricalData([]);
          setError(`No historical data available for the selected range (${timeRange}).`);
          return;
        }

        setHistoricalData(filteredResults);
      } catch (err) {
        console.error('Error fetching historical data:', err);
        setError('Failed to fetch historical data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [sourceCurrency, targetCurrency, timeRange]);

  const handleSwapCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  const finalAmount = amount * conversionRate * (1 - fee / 100);

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      {error && <p className="error">{error}</p>}
      <div className="converter">
        <CurrencyDropdown value={sourceCurrency} onChange={setSourceCurrency} />
        <SwapButton onClick={handleSwapCurrencies} />
        <CurrencyDropdown value={targetCurrency} onChange={setTargetCurrency} />
        <AmountInput value={amount} onChange={setAmount} />
        <FeeInput value={fee} onChange={setFee} />
        {loading ? <p>Loading...</p> : <ConversionResult rate={conversionRate} finalAmount={finalAmount} />}
      </div>
      <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      <ExchangeChart data={historicalData} />
    </div>
  );
};

export default App;
