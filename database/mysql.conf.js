const { Sequelize } = require("sequelize");

const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: "mysql",
    //logging: true
});

const dbConncet = async() => {
    try {
        await sequelize.authenticate();
        console.log("conexion correcta");
    } catch (err) {
        console.log("MYSQL_ERROR_CONEXION", err);
    }
};


//sequelize.sync()
//.then(() => {
//console.log('Modelos sincronizados con la base de datos');
// Aquí puedes comenzar a utilizar los modelos sincronizados
//})
//.catch((error) => {
//console.error('Error al sincronizar modelos:', error);
//});

module.exports = { sequelize, dbConncet };