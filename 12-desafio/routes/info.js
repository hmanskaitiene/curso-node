const { Router } = require('express');
const { info } = require('../controllers/info');
const router = Router();

router.get('/info',info)

module.exports = router;