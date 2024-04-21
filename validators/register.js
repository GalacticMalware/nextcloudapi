const { check } = require('express-validator');
const validatorResult = require('../utils/validator');

const validatorRegister = [
    check('user').exists().notEmpty().isString(),
    check('pass').exists().notEmpty().isString().isLength({ min: 7 }),
    check('path').exists().notEmpty().isString(),
    (req, res, next) => validatorResult(req, res, next)
];

module.exports = { validatorRegister }