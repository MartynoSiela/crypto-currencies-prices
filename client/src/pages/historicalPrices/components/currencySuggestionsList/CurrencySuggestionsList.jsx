import React from 'react';
import {
  CircularProgress, ListItem, ListItemButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import styles from './CurrencySuggestionsList.module.css';

function CurrencySuggestionsList({
  currenciesList,
  loading,
  searching,
  onCurrencyClick,
  error,
}) {
  if ((!currenciesList.length && !searching)) {
    return null;
  }

  return (
    <ul
      className={styles.SuggestionsList}
    >
      {loading && <CircularProgress size={30} />}

      {!loading && currenciesList.length > 0 && (currenciesList.map((currency) => (
        <ListItem
          key={currency.symbol}
          disablePadding
        >
          <ListItemButton
            onClick={() => onCurrencyClick(currency.symbol)}
          >
            {currency.symbol}
          </ListItemButton>
        </ListItem>
      )))}

      {!loading && !currenciesList.length && (
        <ListItem className={styles.NoMatches}>{error || 'No matches found'}</ListItem>
      )}
    </ul>
  );
}

CurrencySuggestionsList.propTypes = {
  currenciesList: PropTypes.arrayOf(Object),
  loading: PropTypes.bool.isRequired,
  searching: PropTypes.bool.isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  error: PropTypes.string,
};

CurrencySuggestionsList.defaultProps = {
  currenciesList: [],
  error: null,
};

export default CurrencySuggestionsList;
