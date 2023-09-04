import React from 'react';
import {
  screen, render, fireEvent, useEvent, waitFor,
} from '@testing-library/react';
import { Formik } from 'formik';
import DateRangePicker from '../src/pages/historicalPrices/components/dateRangePicker';

const ValidationErrorMock = () => render(
  <div data-testid="validation-error" />,
);

const setup = (initialValues = { startDate: null, endDate: null }) => {
  render(
    <Formik initialValues={initialValues}>
      <DateRangePicker />
    </Formik>,
  );
};

describe('<DateRangePicker />', () => {
  it('renders ValidationErrorMock without error', () => {
    ValidationErrorMock();
    expect(screen.getByTestId('validation-error')).toBeInTheDocument();
  });

  it('renders the date pickers correctly', () => {
    setup();
    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
  });

  it('updates the start date when selected', async () => {
    setup();

    const startDateInput = screen.getByLabelText('Start date');
    fireEvent.change(startDateInput, { target: { value: '12/24/2022' } });

    await waitFor(() => expect(startDateInput.value).toBe('12/24/2022'));
  });

  it('updates the end date when selected', async () => {
    setup();

    const startDateInput = screen.getByLabelText('End date');
    fireEvent.change(startDateInput, { target: { value: '12/24/2022' } });

    await waitFor(() => expect(startDateInput.value).toBe('12/24/2022'));
  });
});
