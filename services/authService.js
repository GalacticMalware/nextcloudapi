const { AuthType, createClient } = require("webdav");
const { User } = require("../database/model");
const { v4: uuidv4 } = require("uuid");
const { tokenSing } = require("../utils/JWT");

const searchAuthUser = async(UUID) => await User.findOne({ where: { UUID }, raw: true });

const searchCheckUser = async(User_, Salt) => await User.findOne({ where: { User: User_, Salt }, raw: true });

const registerClient = async(user_, pass, path, salt) => {
    try {
        const dataUser = await User.findAll({ where: { User: user_ }, raw: true });

        if (dataUser.length > 0) throw "El usuario ya existe";

        const UUID = await uuidv4();

        await User.create({
            Nick: path,
            User: user_,
            Password: pass,
            Path: path,
            Salt: salt,
            UUID,
            Visible: true,
            Status: true
        });

        return await tokenSing({ UUID });
    } catch (e) {
        return Promise.reject(e);
    }
};

module.exports = { searchAuthUser, registerClient, searchCheckUser };