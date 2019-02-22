module.exports = router => {
    router.get('/company/:id', (req, res, next) => {
        try {
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    });
};
