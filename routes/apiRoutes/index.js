const express = require('express');
const router = express.Router();

router.use(require('./departments'));
router.use(require('./role'));
router.use(require('./employees'));

module.exports = router;