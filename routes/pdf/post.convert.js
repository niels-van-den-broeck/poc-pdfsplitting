const pdftoimage = require('../../utils/pdf-to-image');

module.exports = router => {
  router.post('/pdfconvert', (req, res, next) => {
    let data = new Buffer('');

    req.on('data', function (chunk) {
      data = Buffer.concat([data, chunk]);
    });

    req.on('end', function () {
      pdftoimage(data, false)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(err => {
          next(err);
        });
    });
  });
};
