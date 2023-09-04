import * as Yup from 'yup';

export const currencyValidation = Yup.object({
  currency: Yup.string()
    .max(30, 'Currency length should be less than 30 symbols')
    .required('Currency is required'),
  startDate: Yup.date()
    .required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required'),
});
