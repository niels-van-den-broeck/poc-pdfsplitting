const express = require('express');
const { notFound } = require('boom');
const cors = require('cors');

const registerRoutes = require('../routes/');
const errorHandler = require('../middlewares/error-handler');

module.exports = app => {
    const router = express.Router();
    registerRoutes(router);

    app.use('/api', router);
    app.use((req, res, next) => next(notFound()));
    app.use(errorHandler);
    app.use(cors());
};