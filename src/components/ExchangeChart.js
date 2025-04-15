import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ExchangeChart = ({ data, fromCurrency, toCurrency }) => {
  if (!data || data.length === 0) {
    return <div className="loading-chart">Loading chart data...</div>;
  }

  // Format date for tooltip and X-axis
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="date">{formatDate(payload[0].payload.date)}</p>
          <p className="rate">
            1 {fromCurrency} = {payload[0].value.toFixed(6)} {toCurrency}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="exchange-chart">
      <h3>Exchange Rate History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate} 
            tick={{ fill: '#ccc' }}
            tickMargin={10}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tick={{ fill: '#ccc' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={{ r: 3 }} 
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExchangeChart;