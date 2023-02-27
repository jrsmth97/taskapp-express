const logger = require("../config/logger");

class ApiError extends Error {
  constructor(statusCode, message, req = null) {
    super(message);
    this.statusCode = statusCode;
    logger.error(`[${statusCode}] Error: ${message} => ${req?.url}`);
  }
}

module.exports = ApiError;
