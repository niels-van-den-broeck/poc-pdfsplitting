const path = require('path');

module.exports = router => {
  router.get('/book/answer/:number', (req, res, next) => {
    const filePath = path.join(__dirname, `../../assets/png/${req.params.number}a.png`);
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(filePath);
  });
};
