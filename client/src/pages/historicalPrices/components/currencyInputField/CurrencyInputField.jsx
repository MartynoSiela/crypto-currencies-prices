import React, { useCallback, useState } from 'react';
import {
  Box, IconButton, InputAdornment, TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Field, useFormikContext } from 'formik';
import axios from 'axios';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { ENDPOINTS } from 'constants/endpoints';
import ValidationError from 'components/validationError';
import CurrencySuggestionsList from '../currencySuggestionsList';
import styles from './CurrencyInputField.module.css';

function CurrencyInputField() {
  const {
    values: { currency }, setFieldValue, errors, touched,
  } = useFormikContext();

  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const fetchCryptos = useCallback(debounce(async (query) => {
    try {
      const response = await axios.get(`${ENDPOINTS.GET_CURRENCY}?symbol=${query}`);
      setCurrencies(response.data);
    } catch (e) {
      setError(e.response.data.error);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }, 500), []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setFieldValue('currency', inputValue);
    setLoading(true);
    setSearching(true);

    if (inputValue) {
      fetchCryptos(inputValue);
    } else {
      setCurrencies([]);
      setLoading(false);
      setSearching(false);
    }
  };

  const handleCurrencyClick = (selectedCurrency) => {
    setFieldValue('currency', selectedCurrency);
    setCurrencies([]);
    setSearching(false);
  };

  return (
    <Box className={styles.InputContainer}>
      <ValidationError touched={touched.currency} error={errors.currency} name="currency" />
      <Field
        className={styles.Input}
        as={TextField}
        name="currency"
        label="Currency Symbol"
        value={currency}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: currency ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  setFieldValue('currency', '');
                  setCurrencies([]);
                  setSearching(false);
                }}
                edge="end"
              >
                <CloseIcon data-testid="close-icon" fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
      <CurrencySuggestionsList
        onCurrencyClick={handleCurrencyClick}
        currenciesList={currencies || []}
        loading={loading}
        searching={searching}
        error={error}
      />
    </Box>
  );
}

export default CurrencyInputField;
