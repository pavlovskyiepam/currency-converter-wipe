# Currency Converter

A responsive currency converter web application built with React that allows real-time currency conversion and historical exchange rate tracking.

![Currency Converter Preview](screenshot.png)

## Features

- Select source and target currencies from dropdowns (default: USD to BRL)
- Input the amount to convert
- Apply an optional percentage-based conversion fee
- View the real-time conversion rate and final amount (after fee)
- View a line chart showing exchange rate history for the past 5 days or 1 month
- Swap source and target currencies with a button click
- Responsive design that works on mobile and desktop
- Dark-themed UI

## Tech Stack

- React (with functional components and hooks)
- JavaScript ES6+
- Axios for API requests
- Recharts for historical data visualization
- CSS for styling

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A Currency Beacon API key (get one at [currencybeacon.com](https://currencybeacon.com))

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Navigate to the project directory
```
cd currency-converter
```

3. Install dependencies
```
npm install
```

4. Create a `.env` file in the root directory and add your Currency Beacon API key
```
REACT_APP_CURRENCY_BEACON_API_KEY=your_api_key_here
```

5. Start the development server
```
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Usage

1. Select the source currency from the "From Currency" dropdown
2. Select the target currency from the "To Currency" dropdown
3. Enter the amount you want to convert
4. Optionally, add a conversion fee percentage
5. View the conversion result and current exchange rate
6. Use the time range selector to view historical data for 5 days or 1 month
7. Click the swap button to switch between source and target currencies

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AmountInput.js    # Input for the amount to convert
│   ├── ConversionResult.js # Display of conversion results
│   ├── CurrencyDropdown.js # Dropdown for currency selection
│   ├── ExchangeChart.js  # Chart for historical exchange rates
│   ├── FeeInput.js       # Input for the conversion fee
│   ├── Loader.js         # Loading indicator component
│   ├── SwapButton.js     # Button to swap currencies
│   └── TimeRangeSelector.js # Selector for historical data range
├── services/             # API services
│   └── currencyService.js # Currency Beacon API service
├── assets/               # Static assets like images
├── App.js                # Main application component
├── App.css               # Main application styles
└── index.js              # Application entry point
```

## API Reference

This application uses the Currency Beacon API for real-time and historical exchange rate data.

## License

[MIT](LICENSE)
