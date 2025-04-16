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
- Loading skeletons for a better user experience during API requests
- Error handling for API request failures
- Responsive design that works on mobile and desktop
- Dark-themed UI

## Tech Stack

- React 19.1.0 (with functional components and hooks)
- JavaScript ES6+
- Axios 1.8.4 for API requests
- Recharts 2.15.2 for historical data visualization
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
cd currency-converter-wipe
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
├── components/                # Reusable UI components
│   ├── AmountInput/           # Input for the amount to convert
│   ├── ChartSkeleton/         # Loading skeleton for the chart
│   ├── ConversionResult/      # Display of conversion results
│   ├── CurrencyDropdown/      # Dropdown for currency selection
│   ├── ExchangeChart/         # Chart for historical exchange rates
│   ├── FeeInput/              # Input for the conversion fee
│   ├── Loader/                # Loading indicator component
│   ├── ResultSkeleton/        # Loading skeleton for results
│   ├── SwapButton/            # Button to swap currencies
│   └── TimeRangeSelector/     # Selector for historical data range
├── services/                  # API services
│   └── currency/              # Currency Beacon API service
│       └── currencyService.js # Service for currency operations
├── assets/                    # Static assets like images
├── App.js                     # Main application component
├── App.css                    # Main application styles
└── index.js                   # Application entry point
```

## API Integration

This application uses the Currency Beacon API for real-time and historical exchange rate data:

- `/latest` endpoint for current exchange rates
- `/timeseries` endpoint for historical exchange rate data

The application currently supports a predefined list of currencies:
- EUR (Euro)
- USD (US Dollar)
- BRL (Brazilian Real)
- UAH (Ukrainian Hryvnia)

## Error Handling

The application includes error handling for API requests:
- Displays user-friendly error messages
- Implements loading states with skeleton components
- Logs detailed errors to the console for debugging

## License

[MIT](LICENSE)
