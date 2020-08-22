const express = require('express');

// Create router
const router = express.Router();

router.get('/', (_, res) => res.send('Hello, World!'));

module.exports = router;