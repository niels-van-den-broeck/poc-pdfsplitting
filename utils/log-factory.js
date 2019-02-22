const { runtime: { logLevel } } = require('../config/config');
const { createLogger, stdSerializers, INFO } = require('bunyan');

module.exports = logName =>
  createLogger({
    name: logName,
    level: logLevel || INFO,
    serializers: stdSerializers,
  });