const express = require("express");
const cors = require('cors');
const ccxt = require ('ccxt')

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

const exchange = new ccxt.bybit();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/search", async (req, res) => {
    const query = req.query.query;

    if (!query) {
      return res.json([]);
    }

    try {
        await exchange.loadMarkets();
    
        const matchingSymbols = Object.values(exchange.markets)
          .filter(market => 
            market.symbol.toLowerCase().includes(query.toLowerCase())
          )
          .map(market => ({
            symbol: market.symbol,
            base: market.base,
            quote: market.quote
          }));

          return res.json(matchingSymbols);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
});

app.get('/currency/history', async (req, res) => {
  try {
    const { currency, startDate, endDate } = req.query;
    const start = Date.parse(startDate)
    const end = Date.parse(endDate)
    const ohlcv = await exchange.fetchOHLCV(currency, '1d', since=start, limit=Math.ceil((end - start) / (24 * 60 * 60 * 1000)) + 1);
    return res.json(ohlcv);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});