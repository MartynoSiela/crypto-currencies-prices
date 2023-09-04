import React from 'react';
import { Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './PageContainer.module.css';

function PageContainer({ title, children }) {
  return (
    <Container className={styles.Container} maxWidth="lg">
      <Typography variant="h4">{title}</Typography>
      {children}
    </Container>
  );
}

PageContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

PageContainer.defaultProps = {
  children: null,
};

export default PageContainer;
