const { verifyToke } = require('../utils/JWT');
const { searchAuthUser } = require('../services/authService')

const validToken = async(req, res, next) => {
    try {
        if (!req.headers.authorization) throw ('No authorize')

        const verify = await verifyToke(req.headers.authorization.split(' ')[1]);

        const user = await searchAuthUser(verify._id.UUID);
        if (!user) throw ('Token invalido');

        req.body.client = { path: user.Path, pass: user.Salt, user: user.User };

        return next();
    } catch (e) {
        console.log(e)
        return res.json({ status: 'error', message: typeof e == !'string' ? 'Ocurrio un error inesperado' : e })
    }
}

module.exports = {
    validToken
}