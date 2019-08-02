const registerGetRoute = require('./get');
const registerAnswerRoute = require('./get.answer');

module.exports = router => {
  registerAnswerRoute(router);
  registerGetRoute(router);
};
