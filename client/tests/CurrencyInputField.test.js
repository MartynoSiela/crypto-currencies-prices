import React from 'react';
import {
  render, screen, fireEvent, waitFor, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Formik } from 'formik';
import axios from 'axios';
import CurrencyInputField from '../src/pages/historicalPrices/components/currencyInputField/CurrencyInputField';

jest.mock('axios');

const debounceTimeout = 500;

const mockData = {
  successResponse: {
    data: [{ symbol: 'BTC' }, { symbol: 'ETH' }, { symbol: 'ADA' }],
  },
  errorResponse: {
    response: {
      data: {
        error: 'An error occurred!',
      },
    },
  },
};

const renderWithFormik = (component, initialValues = { currency: '' }) => render(
  <Formik initialValues={initialValues}>
    {component}
  </Formik>,
);

const changeCurrencyInput = (value) => {
  fireEvent.change(screen.getByLabelText('Currency'), { target: { value } });
  act(() => jest.advanceTimersByTime(debounceTimeout));
};

describe('<CurrencyInputField />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render without crashing', () => {
    renderWithFormik(<CurrencyInputField />);
    expect(screen.getByLabelText('Currency')).toBeInTheDocument();
  });

  it('should show close icon and fetch data when currency is typed', async () => {
    axios.get.mockResolvedValueOnce(mockData.successResponse);
    renderWithFormik(<CurrencyInputField />);

    changeCurrencyInput('B');

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });
  });

  it('should display an error message when fetching currencies fails', async () => {
    axios.get.mockRejectedValueOnce(mockData.errorResponse);
    renderWithFormik(<CurrencyInputField />);

    changeCurrencyInput('B');

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText('An error occurred!')).toBeInTheDocument();
    });
  });

  it('should clear the currency input field when the close icon is clicked', async () => {
    renderWithFormik(<CurrencyInputField />);

    changeCurrencyInput('BTC');
    await waitFor(() => expect(screen.getByLabelText('Currency').value).toBe('BTC'));

    fireEvent.click(screen.getByTestId('close-icon'));
    await waitFor(() => expect(screen.getByLabelText('Currency').value).toBe(''));
  });

  it('should not fetch data or show the close icon when input is empty', async () => {
    renderWithFormik(<CurrencyInputField />);

    changeCurrencyInput('');

    await waitFor(() => {
      expect(axios.get).not.toHaveBeenCalled();
      expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
    });
  });

  it('should display the list of fetched currencies', async () => {
    axios.get.mockResolvedValueOnce(mockData.successResponse);
    renderWithFormik(<CurrencyInputField />);

    changeCurrencyInput('B');

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      mockData.successResponse.data.forEach((currency) => {
        expect(screen.getByText(currency.symbol)).toBeInTheDocument();
      });
    });
  });

  it('should update the currency input field when a currency is selected from the suggestions', async () => {
    axios.get.mockResolvedValueOnce(mockData.successResponse);
    renderWithFormik(<CurrencyInputField />);

    changeCurrencyInput('B');

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText('BTC')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('BTC'));
    await waitFor(() => expect(screen.getByLabelText('Currency').value).toBe('BTC'));
  });
});
