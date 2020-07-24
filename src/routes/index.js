const router = require('express').Router();

router.get('/', (req, res) => {
    res.redirect('./lists');
})


module.exports = router;