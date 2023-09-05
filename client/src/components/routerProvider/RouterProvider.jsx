import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from 'pages/home/Home';
import HistoricalPrices from 'pages/historicalPrices';
import Navbar from 'components/navbar';

function RouterProvider({ colorTheme, toggleColorTheme }) {
  return (
    <Router>
      <div>
        <Navbar colorTheme={colorTheme} toggleColorTheme={toggleColorTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historical-prices" element={<HistoricalPrices />} />
        </Routes>
      </div>
    </Router>
  );
}

RouterProvider.propTypes = {
  colorTheme: PropTypes.string,
  toggleColorTheme: PropTypes.func,
};

RouterProvider.defaultProps = {
  colorTheme: '',
  toggleColorTheme: null,
};

export default RouterProvider;
