const path = require('path');

module.exports = router => {
  router.get('/book/page/:number', (req, res, next) => {
    const filePath = path.join(__dirname, `../../assets/jpeg/${req.params.number}.jpeg`);
    res.set('Access-Control-Allow-Origin', '*');

    res.sendFile(filePath);
  });
};
