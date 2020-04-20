const express = require('express');
const { notFound } = require('boom');
const cors = require('cors');

const registerRoutes = require('../routes/');
const errorHandler = require('../middlewares/error-handler');

module.exports = app => {
  const router = express.Router();
  registerRoutes(router);
  router.get('*', (req, res, next) => {
    res.redirect('https://www.howtogeek.com/thumbcache/2/200/720edbc92378795cc807e166cc8ba7e3/wp-content/uploads/2018/05/2018-06-03-1.png');
  });
  app.use('/api', router);
  app.use((req, res, next) => next(notFound()));
  app.use(errorHandler);
  app.use(cors());
};
