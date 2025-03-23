const express = require('express');
const { createEntry } = require('../controllers/entry');

const router = express.Router();

router.post('/createEntry', createEntry);

module.exports = router;