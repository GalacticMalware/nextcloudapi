const { encrypt, compare } = require('../utils/encrypto');
const { searchUser, registerClient, searchCheckUser } = require('../services/authService');
const { tokenSing } = require('../utils/JWT');

const login = async(req, res) => {
    try {
        const { user, pass, path } = req.body;

        const client = await searchCheckUser(user, pass);

        if (!client) return res.status(500).json({ status: 'error', message: 'El usuario no existe' });

        const check = await compare(pass, client.Password);

        if (!check) return res.status(401).json({ status: 'error', message: 'Las credenciales no coinciden por favor verifique nuevamente' });

        const data = { token: await tokenSing({ UUID: client.UUID }) };

        return res.status(200).json({ status: 'success', message: 'El usuario inicio sesion', data });
    } catch (e) {
        if (process.env.DEBUG) console.log(e);
        //logger(new Error(e));
        return res.status(500).json({ status: 'error', message: 'Ocurrio un error inesperado' });
    };
};

const register = async(req, res) => {
    try {
        const { user, pass, path } = req.body;

        let passwordHas = await encrypt(pass);

        const client = await registerClient(user, passwordHas, path, pass);

        return res.json({ status: 'success', data: { token: client } });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ status: false, message: 'Error al registar' });
    }
}

module.exports = { login, register };