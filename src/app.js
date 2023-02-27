require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const httpStatus = require('http-status');
const logger = require('./config/logger');
const routes = require('./routes');
const ApiError = require('./utils/api-error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// api routes
app.use('/', routes);

// not found handler
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found', req));
});

let server;
mongoose.connect(process.env.MONGO_URL).then(() => {
  logger.info('Connected to MongoDB');
  const port = process.env.APP_PORT;
  server = app.listen(port, () => {
    logger.info(`Listening to port ${port}`);
  });
});

