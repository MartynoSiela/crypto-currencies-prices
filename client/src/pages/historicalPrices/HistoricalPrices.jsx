import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { currencyValidation } from 'constants/validation/currency';
import PageContainer from 'components/pageContainer/PageContainer';
import CurrencyInputField from './components/currencyInputField';
import DateRangePicker from './components/dateRangePicker';
import CurrencyPricesGraph from './components/currencyPricesGraph';
import styles from './HistoricalPrices.module.css';

function HistoricalPrices() {
  const [queryValues, setQueryValues] = useState(null);

  const initialValues = {
    currency: '',
    startDate: null,
    endDate: null,
  };

  const validateDates = (values) => {
    const errors = {};
    if (values.startDate && values.endDate && values.endDate < values.startDate) {
      errors.endDate = 'End date cannot be earlier than start date';
    }
    return errors;
  };

  return (
    <PageContainer title="Cryptocurrency Historical Prices">
      <Box className={styles.Content}>
        <Formik
          validationSchema={currencyValidation}
          initialValues={initialValues}
          validateOnBlur={false}
          onSubmit={(values) => {
            setQueryValues(values);
          }}
          validate={validateDates}
        >
          <div className={styles.FormContainer}>
            <Form className={styles.Form}>
              <CurrencyInputField />
              <DateRangePicker />
              <Box mt={2}>
                <Button type="submit" variant="contained">Get Prices</Button>
              </Box>
            </Form>

          </div>
        </Formik>
      </Box>
      {queryValues && <CurrencyPricesGraph values={queryValues} />}
    </PageContainer>
  );
}

export default HistoricalPrices;
