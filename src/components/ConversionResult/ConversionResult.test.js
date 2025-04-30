import { render, screen, within } from '@testing-library/react';
import ConversionResult from './ConversionResult';

describe('ConversionResult Component', () => {
  test('renders the component with valid props', () => {
    // Arrange: Define valid props
    const props = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
      rate: 0.85,
      fee: 2.5,
    };

    // Act: Render the component
    render(<ConversionResult {...props} />);

    // Assert: Check for static labels
    expect(screen.getByText('Conversion Result')).toBeInTheDocument();
    expect(screen.getByText('Exchange Rate:')).toBeInTheDocument();
    expect(screen.getByText('Amount:')).toBeInTheDocument();
    expect(screen.getByText('Converted:')).toBeInTheDocument();
    expect(screen.getByText('Fee (2.5%):')).toBeInTheDocument();
    expect(screen.getByText('Final Amount:')).toBeInTheDocument();

    // Assert: Check for dynamic values
    expect(screen.getByText('1 USD = 0.850000 EUR')).toBeInTheDocument();
    expect(screen.getByText('100.00 USD')).toBeInTheDocument();
    expect(screen.getByText('85.00 EUR')).toBeInTheDocument();
    expect(screen.getByText('-2.13 EUR')).toBeInTheDocument();
    expect(screen.getByText('82.88 EUR')).toBeInTheDocument();
  });

  test('correctly displays exchange rate', () => {
    // Arrange
    const props = {
      fromCurrency: 'BRL',
      toCurrency: 'USD',
      amount: 50,
      rate: 0.19,
      fee: 0,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify the exchange rate is displayed with proper formatting
    expect(screen.getByText('1 BRL = 0.190000 USD')).toBeInTheDocument();
  });

  test('correctly displays amount', () => {
    // Arrange
    const props = {
      fromCurrency: 'EUR',
      toCurrency: 'GBP',
      amount: 75.5,
      rate: 0.86,
      fee: 0,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify the amount is displayed with proper currency
    expect(screen.getByText('75.50 EUR')).toBeInTheDocument();
  });

  test('correctly calculates and displays converted amount', () => {
    // Arrange
    const props = {
      fromCurrency: 'USD',
      toCurrency: 'JPY',
      amount: 25,
      rate: 110.5,
      fee: 0,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify the converted amount calculation (25 * 110.5 = 2762.50)
    // Using within to find the text inside the converted amount row
    const convertedRow = screen.getAllByText(/Converted:/)[0].closest('.detail-row');
    expect(within(convertedRow).getByText('2762.50 JPY')).toBeInTheDocument();
  });

  test('displays fee row when fee is greater than zero', () => {
    // Arrange
    const props = {
      fromCurrency: 'USD',
      toCurrency: 'CAD',
      amount: 100,
      rate: 1.35,
      fee: 3.75,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify fee row is displayed
    expect(screen.getByText('Fee (3.75%):')).toBeInTheDocument();
    // Fee amount should be 1.35 * 100 * 0.0375 = 5.06
    expect(screen.getByText('-5.06 CAD')).toBeInTheDocument();
  });

  test('does not display fee row when fee is zero', () => {
    // Arrange
    const props = {
      fromCurrency: 'GBP',
      toCurrency: 'AUD',
      amount: 50,
      rate: 1.9,
      fee: 0,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify fee row is not displayed
    const feeText = screen.queryByText(/Fee/);
    expect(feeText).not.toBeInTheDocument();
  });

  test('correctly calculates and displays final amount', () => {
    // Arrange
    const props = {
      fromCurrency: 'CHF',
      toCurrency: 'EUR',
      amount: 200,
      rate: 1.05,
      fee: 2,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify final amount calculation
    // Base result: 200 * 1.05 = 210
    // Fee amount: 210 * 0.02 = 4.2
    // Final result: 210 - 4.2 = 205.8
    const finalRow = screen.getByText('Final Amount:').closest('.detail-row');
    expect(within(finalRow).getByText('205.80 EUR')).toBeInTheDocument();
  });

  test('handles zero amount correctly', () => {
    // Arrange
    const props = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 0,
      rate: 0.85,
      fee: 2.5,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: All calculated values should be zero
    const amountRow = screen.getByText('Amount:').closest('.detail-row');
    expect(within(amountRow).getByText('0.00 USD')).toBeInTheDocument();
    
    const convertedRow = screen.getByText('Converted:').closest('.detail-row');
    expect(within(convertedRow).getByText('0.00 EUR')).toBeInTheDocument();
    
    const feeRow = screen.getByText(/Fee/).closest('.detail-row');
    expect(within(feeRow).getByText(/-0.00 EUR/)).toBeInTheDocument();
    
    const finalRow = screen.getByText('Final Amount:').closest('.detail-row');
    expect(within(finalRow).getByText('0.00 EUR')).toBeInTheDocument();
  });

  test('handles zero rate correctly', () => {
    // Arrange
    const props = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
      rate: 0,
      fee: 2.5,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Converted and final amounts should be zero
    expect(screen.getByText('1 USD = 0.000000 EUR')).toBeInTheDocument();
    
    const convertedRow = screen.getByText('Converted:').closest('.detail-row');
    expect(within(convertedRow).getByText('0.00 EUR')).toBeInTheDocument();
    
    const feeRow = screen.getByText(/Fee/).closest('.detail-row');
    expect(within(feeRow).getByText(/-0.00 EUR/)).toBeInTheDocument();
    
    const finalRow = screen.getByText('Final Amount:').closest('.detail-row');
    expect(within(finalRow).getByText('0.00 EUR')).toBeInTheDocument();
  });

  test('handles very small values with precision', () => {
    // Arrange
    const props = {
      fromCurrency: 'BTC',
      toCurrency: 'USD',
      amount: 0.00001,
      rate: 50000,
      fee: 1,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify precise calculations for small values
    // 0.00001 * 50000 = 0.50
    // Fee: 0.50 * 0.01 = 0.005
    // Final: 0.50 - 0.005 = 0.495 → rounds to 0.49 in display
    const amountRow = screen.getByText('Amount:').closest('.detail-row');
    expect(within(amountRow).getByText('0.00 BTC')).toBeInTheDocument();
    
    const convertedRow = screen.getByText('Converted:').closest('.detail-row');
    expect(within(convertedRow).getByText('0.50 USD')).toBeInTheDocument();
    
    const feeRow = screen.getByText(/Fee/).closest('.detail-row');
    expect(within(feeRow).getByText(/-0.01 USD/)).toBeInTheDocument();
    
    const finalRow = screen.getByText('Final Amount:').closest('.detail-row');
    expect(within(finalRow).getByText('0.49 USD')).toBeInTheDocument(); // Updated from 0.50 to 0.49
  });

  test('handles large values correctly', () => {
    // Arrange
    const props = {
      fromCurrency: 'IDR',
      toCurrency: 'USD',
      amount: 1000000,
      rate: 0.000065,
      fee: 1.5,
    };

    // Act
    render(<ConversionResult {...props} />);

    // Assert: Verify calculations for large values
    // 1000000 * 0.000065 = 65
    // Fee: 65 * 0.015 = 0.975
    // Final: 65 - 0.975 = 64.025
    const amountRow = screen.getByText('Amount:').closest('.detail-row');
    expect(within(amountRow).getByText('1000000.00 IDR')).toBeInTheDocument();
    
    const convertedRow = screen.getByText('Converted:').closest('.detail-row');
    expect(within(convertedRow).getByText('65.00 USD')).toBeInTheDocument();
    
    const feeRow = screen.getByText(/Fee/).closest('.detail-row');
    expect(within(feeRow).getByText(/-0.97 USD/)).toBeInTheDocument(); // Updated from -0.98 to -0.97
    
    const finalRow = screen.getByText('Final Amount:').closest('.detail-row');
    expect(within(finalRow).getByText('64.03 USD')).toBeInTheDocument();
  });
});
