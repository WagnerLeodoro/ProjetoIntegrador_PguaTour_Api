require('express-async-errors')

const express = require('express');
require('dotenv').config()
const cors = require('cors')
const routes = require("./src/routes")

const AppError = require('./src/utils/AppError')

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  })
  

const SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
