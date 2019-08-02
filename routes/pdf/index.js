const registerUploadRoute = require('./post.convert');
const registerConvertAnswer = require('./post.convert.answer');

module.exports = router => {
  registerUploadRoute(router);
  registerConvertAnswer(router);
};
