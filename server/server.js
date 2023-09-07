const app = require('./functions/app')
const logger = require('./functions/logger')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`)
})
