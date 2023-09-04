const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/`;

export const ENDPOINTS = {
  GET_CURRENCY: `${BASE_URL}search`,
  GET_PRICE_HISTORY: `${BASE_URL}currency/history`,
};
