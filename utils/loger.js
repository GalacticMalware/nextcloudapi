const fs = require('fs');

/**
 * Capture messages loger error
 * @param {string} messages
 * @returns
 */

const logger = (messages) => {
    const path = `${__dirname}\\..\\logs\\`;
    if (process.env.DEBUG) console.log(messages);
    try {
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        fs.appendFile(`${path}/log_${(new Date().toISOString().split('T').shift())}.log`, messages, (e) => {
            return process.env.DEBUG ? console.log(e) : console.log();
        });
    } catch (e) {
        return process.env.DEBUG ? console.log(e) : console.log();
    }
}

module.exports = { logger };