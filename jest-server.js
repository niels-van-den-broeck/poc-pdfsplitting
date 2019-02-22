const express = require('express');

const configureApp = require('./config/express');
const app = express();

configureApp(app);

module.exports = app;