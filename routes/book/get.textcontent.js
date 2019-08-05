const { loadDoc, getPageContent } = require('../../utils/pdf-helpers');

module.exports = router => {
  router.get('/book/textcontent', (req, res, next) => {
    let data = new Buffer('');

    req.on('data', function (chunk) {
      data = Buffer.concat([data, chunk]);
    });

    req.on('end', function () {
      loadDoc(data)
        .then(getPageContent)
        .then(pc => res.json({ pc }))
        .catch(next);
    });
  });
};
