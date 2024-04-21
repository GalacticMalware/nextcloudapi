const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (e) {
        const resDebug = res.status(403).json({ message: 'PARAMS_ERROR', data: e.array() }),
            resProd = res.status(500).json({ message: 'Ocurrio un error inesperado', status: 'error' });

        return process.env.DEBUG ? resDebug : resProd
    }
}