import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext } from 'formik';
import ValidationError from 'components/validationError';

function DateRangePicker() {
  const {
    values, errors, touched, setFieldValue, setFieldTouched,
  } = useFormikContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ValidationError
        touched={typeof touched.startDate === 'object' ? true : touched.startDate}
        error={errors.startDate}
        name="startDate"
      />
      <DatePicker
        name="startDate"
        label="Start date"
        value={values.startDate}
        onChange={(date) => {
          setFieldValue('startDate', date);
          setFieldTouched('startDate', true);
        }}
        slotProps={{ textField: { variant: 'outlined', disabled: true } }}
      />
      <ValidationError
        touched={typeof touched.endDate === 'object' ? true : touched.endDate}
        error={errors.endDate}
        name="endDate"
      />
      <DatePicker
        name="endDate"
        label="End date"
        value={values.endDate}
        minDate={values.startDate}
        onChange={(date) => {
          setFieldValue('endDate', date);
          setFieldTouched('endDate', true);
        }}
        slotProps={{ textField: { variant: 'outlined', disabled: true } }}
      />
    </LocalizationProvider>
  );
}

export default DateRangePicker;
