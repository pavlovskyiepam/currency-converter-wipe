import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExchangeChart = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No historical data available.</p>;
  }

  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: 'Exchange Rate',
        data: data.map((entry) => entry.rate),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historical Exchange Rates',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ExchangeChart;