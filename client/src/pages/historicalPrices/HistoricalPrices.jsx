import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { ENDPOINTS } from 'constants/endpoints';
import { currencyValidation } from 'constants/validation/currency';
import PageContainer from 'components/pageContainer/PageContainer';
import CurrencyInputField from './components/currencyInputField';
import DateRangePicker from './components/dateRangePicker';
import Graph from './components/graph';
import styles from './HistoricalPrices.module.css';

function HistoricalPrices() {
  const [graphLoading, setGraphLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);

  const fetchData = async (values) => {
    try {
      const response = await axios.get(ENDPOINTS.GET_PRICE_HISTORY, {
        params: {
          currency: values.currency,
          startDate: format(values.startDate, 'yyyy-MM-dd'),
          endDate: format(values.endDate, 'yyyy-MM-dd'),
        },
      });
      setGraphData(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGraphLoading(false);
    }
  };

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
    <PageContainer title="Historical Prices">
      <Box className={styles.Content}>
        <Formik
          validationSchema={currencyValidation}
          initialValues={initialValues}
          validateOnBlur={false}
          onSubmit={(values) => {
            setGraphLoading(true);
            fetchData(values);
          }}
          validate={validateDates}
        >
          <div className={styles.FormContainer}>
            <Form className={styles.Form}>
              <CurrencyInputField />
              <DateRangePicker />
              <Box mt={2}>
                <Button type="submit" variant="contained">Submit</Button>
              </Box>
            </Form>
          </div>
        </Formik>
      </Box>
      <Box>
        {graphLoading
          ? (<CircularProgress />)
          : graphData && (<Graph data={graphData} />)}
      </Box>
    </PageContainer>
  );
}

export default HistoricalPrices;
