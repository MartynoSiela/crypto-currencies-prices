const express = require('express')
const cors = require('cors')
const logger = require('./logger')
const ccxt = require('ccxt')

const app = express()
app.use(cors({ origin: ['https://cryptocurrencyhistorical-d4b92.firebaseapp.com', 'http://localhost:3000'] }))

const exchange = new ccxt.mexc()

app.get('/search', async (req, res) => {
  const query = req.query.query

  if (!query) {
    return res.json([])
  }

  logger.info(`User searched for cryptocurrency: ${query}`)
  try {
    await exchange.loadMarkets()

    const matchingSymbols = Object.values(exchange.markets)
      .filter(market =>
        market.symbol.toLowerCase().includes(query.toLowerCase())
      )
      .filter(market =>
        market.type !== 'option')
      .map(market => ({
        symbol: market.symbol,
        base: market.base,
        quote: market.quote
      }))

    return res.json(matchingSymbols)
  } catch (error) {
    logger.info(error)
    return res.status(500).json({ message: error.message })
  }
})

app.get('/currency/history', async (req, res) => {
  try {
    const { currency, startDate, endDate } = req.query
    logger.info(`User selected cryptocurrency: ${currency}`)
    const start = Date.parse(startDate) - (24 * 60 * 60 * 1000)
    const end = Date.parse(endDate)
    const ohlcv = await exchange.fetchOHLCV(currency, '1d', start, Math.ceil((end - start) / (24 * 60 * 60 * 1000)))
    return res.json(ohlcv)
  } catch (error) {
    logger.info(error)
    return res.status(500).json({ message: error.message })
  }
})

module.exports = app
