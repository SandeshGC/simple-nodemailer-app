const dotenv = require("dotenv")

dotenv.config()

constants = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  EMAIL_SENDER_ID: process.env.EMAIL_SENDER_ID,
  EMAIL_SENDER_PASSWORD: process.env.EMAIL_SENDER_PASSWORD,
}

module.exports = constants
