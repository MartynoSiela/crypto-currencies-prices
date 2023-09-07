import React from 'react';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Graph from 'components/graph';
import { ENDPOINTS } from 'constants/endpoints';
import useQuery from 'hooks/useQuery';
import queryService from 'services/query';

function CurrencyPricesGraph({ values }) {
  const pricesQuery = useQuery(
    {
      url: queryService.createUrl(
        ENDPOINTS.GET_PRICE_HISTORY,
        {
          symbol: values.currency,
          startDate: format(values.startDate, 'yyyy-MM-dd'),
          endDate: format(values.endDate, 'yyyy-MM-dd'),
        },
      ),
    },
  );

  return (
    <div>
      {pricesQuery.isLoading
        ? (<CircularProgress />)
        : pricesQuery.data && (<Graph data={pricesQuery.data} />)}
    </div>
  );
}

CurrencyPricesGraph.propTypes = {
  values: PropTypes.instanceOf(Object).isRequired,
};

CurrencyPricesGraph.defaultProps = {
};

export default CurrencyPricesGraph;
