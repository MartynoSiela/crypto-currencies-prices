const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const routes = require('./routes')

const app = express()

app.use(cors({ origin: ['https://cryptocurrencyhistorical-d4b92.firebaseapp.com', 'http://localhost:3000'] }))

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
console.log(JSON.stringify(specs, null, 2))

app.use(routes)
app.use('/', swaggerUi.serve, swaggerUi.setup(specs))

module.exports = app
