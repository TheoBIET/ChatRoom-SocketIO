const express = require('express');
const router = express.Router();

const {mainController, errorController} = require('../controllers');

router
    .get('/', mainController.homePage)

    .get('/login', mainController.loginForm)
    .post('/login', mainController.handleLoginForm)

    .get('/signup', mainController.signupForm)
    .post('/signup', mainController.handleSignupForm)

    .get('*', errorController.error404);

module.exports = router;