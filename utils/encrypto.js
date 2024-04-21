const bcrypto = require('bcrypt');
const salt = bcrypto.genSaltSync(10);

const encrypt = async(text) => await bcrypto.hashSync(text, salt);

const decrypt = (text, textCompare) => bcrypto.compareSync(text, textCompare) ? true : false;

const compare = async(passPlain, hashPass) => await bcrypto.compare(passPlain, hashPass);

module.exports = {
    encrypt,
    decrypt,
    compare
}