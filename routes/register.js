const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { validatorRegister } = require('../validators/register');

router.post('/register_nextcloud', validatorRegister, register);


module.exports = router;