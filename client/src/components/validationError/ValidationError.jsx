import React from 'react';
import PropTypes from 'prop-types';
import styles from './ValidationError.module.css';

export default function ValidationError({
  name, touched, error,
}) {
  return (
    <div className={styles.ErrorContainer}>
      {touched && error ? (
        <div className={styles.Error} name={name}>{error}</div>
      ) : null}
    </div>
  );
}

ValidationError.propTypes = {
  name: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
};

ValidationError.defaultProps = {
  touched: false,
  error: '',
};
