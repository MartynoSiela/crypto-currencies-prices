const express = require('express')
const logger = require('./logger')
const ccxt = require('ccxt')

const router = express.Router()
const exchange = new ccxt.mexc()

/**
 * @swagger
 * /search:
 *   get:
 *     description: Search for cryptocurrencies
 *     parameters:
 *       - name: symbol
 *         in: query
 *         required: true
 *         description: Search currency by symbol
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with list of cryptocurrencies
 */
router.get('/search', async (req, res) => {
  const symbol = req.query.symbol

  if (!symbol) {
    return res.json([])
  }

  logger.info(`User searched for cryptocurrency: ${symbol}`)
  try {
    await exchange.loadMarkets()

    const matchingSymbols = Object.values(exchange.markets)
      .filter(market =>
        market.symbol.toLowerCase().includes(symbol.toLowerCase())
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

/**
 * @swagger
 * /currency/history:
 *   get:
 *     description: Get currency history
 *     parameters:
 *       - name: symbol
 *         in: query
 *         required: true
 *         description: Cryptocurrency symbol to fetch history for
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         required: true
 *         description: Start date for history data
 *         schema:
 *           type: string
 *           format: date
 *       - name: endDate
 *         in: query
 *         required: true
 *         description: End date for history data
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Successful response with list of history data
 */
router.get('/currency/history', async (req, res) => {
  try {
    const { symbol, startDate, endDate } = req.query
    logger.info(`User selected cryptocurrency: ${symbol}`)
    const start = Date.parse(startDate) - (24 * 60 * 60 * 1000)
    const end = Date.parse(endDate)
    const ohlcv = await exchange.fetchOHLCV(symbol, '1d', start, Math.ceil((end - start) / (24 * 60 * 60 * 1000)))
    return res.json(ohlcv)
  } catch (error) {
    logger.info(error)
    return res.status(500).json({ message: error.message })
  }
})

module.exports = router
