import { render, screen, fireEvent } from '@testing-library/react';
import WeatherSearch from '../components/WeatherSearch';

test('renders WeatherSearch component and performs search', async () => {
  render(<WeatherSearch />);
  const input = screen.getByPlaceholderText('Enter city');
  fireEvent.change(input, { target: { value: 'London' } });
  const button = screen.getByText('Search');
  fireEvent.click(button);
  // Test if loading state or error message appears
});

