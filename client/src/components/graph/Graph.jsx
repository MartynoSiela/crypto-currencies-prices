import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import ValidationError from 'components/validationError';

function Graph({ data }) {
  const lowPrices = data.map((d) => d[2]);
  const highPrices = data.map((d) => d[3]);
  const minY = Math.min(...lowPrices, ...highPrices);
  const maxY = Math.max(...lowPrices, ...highPrices);
  const margin = (maxY - minY) * 0.1;

  const series = [{
    name: 'candle',
    data: data.map((item) => ({
      x: new Date(item[0]),
      y: [item[1], item[2], item[3], item[4]],
    })),
  }];

  const options = {
    chart: {
      height: '100%',
      width: '100%',
      type: 'candlestick',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      min: minY - margin,
      max: maxY + margin,
    },
  };

  return (
    <div>
      { data.length > 0
        ? (<ReactApexChart options={options} series={series} type="candlestick" />)
        : (<ValidationError touched error="No data to display" />)}
    </div>
  );
}

Graph.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};

Graph.defaultProps = {
};

export default Graph;
