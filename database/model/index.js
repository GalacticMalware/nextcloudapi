const { DataTypes } = require('sequelize');
const { sequelize } = require('../mysql.conf');

const UserModel = require('./userModel');
const User = UserModel(sequelize, DataTypes);

module.exports = {
    User
}