const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.TOKEN_SECRET;

/**
 * Verify token with JSON_WEB_TOKEN
 * @param {string} token 
 * @returns 
 */
const verifyToke = async(token) => await jwt.verify(token, JWT_SECRET);

/**
 * Generate TOKEN with data user
 * @param {object} user 
 * @returns 
 */
const tokenSing = async(uuid) => await jwt.sign({
        _id: uuid,
    },
    JWT_SECRET, {
        expiresIn: "5h",
    }
);

module.exports = { verifyToke, tokenSing };