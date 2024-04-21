const { v4: uuidv4 } = require("uuid");

const UUID = async(generate = "") => await uuidv4(generate);

module.exports = { UUID };