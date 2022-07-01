import { render, screen } from '@testing-library/react';
import App from './App';

test('renders school title', () => {
  render(<App />);
  const element = screen.getByText(/School APP/i);
  expect(element).toBeInTheDocument();
});
