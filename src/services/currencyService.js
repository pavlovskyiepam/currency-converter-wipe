import axios from 'axios';

// Base URL for Currency Beacon API
const API_BASE_URL = 'https://api.currencybeacon.com/v1';
const API_KEY = process.env.REACT_APP_CURRENCY_BEACON_API_KEY;

// Predefined list of currencies
export const predefinedCurrencies = [
  { code: 'EUR', name: 'Euro' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'UAH', name: 'Ukrainian Hryvnia' }
];

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY
  }
});

// Get all available currencies (now returns predefined list)
export const getCurrencies = async () => {
  return predefinedCurrencies;
};

// Get current exchange rate between two currencies
export const getExchangeRate = async (from, to) => {
  try {
    const response = await apiClient.get('/latest', {
      params: {
        base: from,
        symbols: to
      }
    });
    
    // Check if the response has the expected structure
    if (response.data && response.data.rates && response.data.rates[to] !== undefined) {
      return response.data.rates[to];
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    throw error;
  }
};

// Get historical exchange rate data
export const getHistoricalRates = async (from, to, days) => {
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Format dates as YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    // Using the timeseries endpoint as per documentation
    const response = await apiClient.get('/timeseries', {
      params: {
        base: from,
        symbols: to,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate)
      }
    });
    
    // Transform data for chart
    const chartData = [];
    
    // Process the response according to actual API structure
    // Check if response is valid
    if (response.data && response.data.meta && response.data.meta.code === 200) {
      // Filter out meta and response fields
      const dateKeys = Object.keys(response.data).filter(key => 
        key !== 'meta' && key !== 'response' && !isNaN(Date.parse(key))
      );
      
      // Extract data for each date
      dateKeys.forEach(date => {
        const dateData = response.data[date];
        if (dateData && dateData[to] !== undefined) {
          chartData.push({
            date,
            rate: dateData[to]
          });
        }
      });
      
      // Sort by date
      return chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    throw error;
  }
};