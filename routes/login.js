const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { validatorLogin } = require('../validators/auth');

router.post('/generateToken', validatorLogin, login);

module.exports = router;