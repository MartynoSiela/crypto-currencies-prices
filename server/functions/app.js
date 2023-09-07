const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const functions = require('firebase-functions')
const rateLimit = require('express-rate-limit')
const routes = require('./routes')
const logger = require('./logger')

const app = express()

app.use(cors({ origin: ['https://cryptocurrencyhistorical-d4b92.firebaseapp.com', 'http://localhost:3000'] }))

const NODE_ENV = process.env.NODE_ENV || functions.config().env_vars.node_env

if (NODE_ENV === 'production') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many requests, please try again later.'
  })

  app.use(limiter)
  app.get('/', (req, res) => res.send({ status: 'OK', uptime: process.uptime() }))
}

app.use(routes)

if (NODE_ENV === 'development') {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Crypto API',
        version: '1.0.0',
        description: 'API to fetch cryptocurrency information'
      }
    },
    apis: ['./functions/routes.js']
  }

  const specs = swaggerJsdoc(options)
  app.use('/', swaggerUi.serve, swaggerUi.setup(specs))
}

app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found' })
})

app.use((err, req, res, next) => {
  logger.info(err.stack)
  res.status(500).send({ error: 'Internal Server Error' })
})

module.exports = app
