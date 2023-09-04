import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'components/navbar/Navbar';
import Home from 'pages/home/Home';
import HistoricalPrices from 'pages/historicalPrices';

export default function RouterProvider() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historical-prices" element={<HistoricalPrices />} />
        </Routes>
      </div>
    </Router>
  );
}
