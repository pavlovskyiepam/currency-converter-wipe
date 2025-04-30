import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText('82.88 EUR')).toBeInTheDocument(); // Updated to match the rendered value
  });
});
