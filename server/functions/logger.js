const isFirebaseEnvironment = process.env.FUNCTION_TARGET && process.env.GCLOUD_PROJECT

if (isFirebaseEnvironment) {
  module.exports = require('firebase-functions/logger')
} else {
  module.exports = console
}
