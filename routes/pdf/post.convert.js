const pdftoimage = require('../../utils/pdf-to-image');
const multer  = require('multer');
const upload = multer({});

module.exports = router => {
  router.post('/pdfconvert', upload.single('file'), async (req, res, next) => {
    return pdftoimage(req.file.buffer, false)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  });
};
