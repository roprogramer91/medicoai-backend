const express = require('express');
const router = express.Router();
const { chatWithGpt } = require('../controllers/chatController');

router.post('/', chatWithGpt);

module.exports = router;
