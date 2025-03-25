const express = require('express');
const { createEntry, getAllEntries } = require('../controllers/entry');
const {authenticate} = require('../middleware/auth')
const router = express.Router();

router.post('/createEntry',authenticate, createEntry);
router.post('/entries', getAllEntries);

module.exports = router;