const express = require('express');

// Create router
const router = express.Router();

router.get('/', (_, res) => res.json({ version: 1, timestamp: new Date().getTime() }));

module.exports = router;