import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import TableCountries from "./components/TableCountries";
import "@testing-library/jest-dom";

test('renders country code filter component', () => {
  render(<App />);
  const linkElement = screen.getByText('Country Code filter component');
  expect(linkElement).toBeInTheDocument();
});

test('test filter country code table', async () => {
  render(<TableCountries />);

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  const input = await screen.findByTestId('input-c-code');
  fireEvent.change(input, {target: {value: 'ee'}})
  expect(await screen.findByTestId('EE')).toHaveTextContent('EE')
})
