const express = require('express');
const router = express.Router();

const {mainController} = require('./controllers');

router.get('/', mainController.homePage);

module.exports = router;