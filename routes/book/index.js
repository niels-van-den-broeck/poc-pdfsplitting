const registerGetRoute = require('./get');
const registerAnswerRoute = require('./get.answer');
const registerTextContentRoute = require('./get.textcontent');

module.exports = router => {
  registerAnswerRoute(router);
  registerGetRoute(router);
  registerTextContentRoute(router);
};
