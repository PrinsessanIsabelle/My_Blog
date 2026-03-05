const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Get posts');
});
module.exports = router;