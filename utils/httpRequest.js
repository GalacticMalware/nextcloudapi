const axios = require('axios');

const httpRequest = async(url, method, body = {}, Requesttoken = {}, Authorization = {}) => {
    let config = {
        method,
        maxBodyLength: Infinity,
        url,
        headers: {
            'Requesttoken': `${Requesttoken}`,
            'Content-Type': 'application/json,text/plain',
            'Authorization': `${Authorization}`,
            'Cookie': process.env.HTTP_C
        },
        data: body
    };

    return await axios.request(config)
}

module.exports = { httpRequest }