const express = require('express');
const { createEntry, getAllEntries } = require('../controllers/entry');

const router = express.Router();

router.post('/createEntry', createEntry);
router.post('/entries', getAllEntries);

module.exports = router;