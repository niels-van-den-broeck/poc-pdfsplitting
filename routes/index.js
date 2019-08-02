const registerBookRoutes = require('./book');
const registerPdfRoutes = require('./pdf');

module.exports = router => {
  registerBookRoutes(router);
  registerPdfRoutes(router);
};
