const { httpRequest } = require('../utils/httpRequest');
const { UUID } = require('../utils/UUID');

const generateTokenCSRF = async(auth) => {
    const url = process.env.URL_CSFR;
    return (await httpRequest(url, "GET", {}, {}, auth)).data.token;
}

const generateShareLink = async(path, tokenCSRF, tokenGenerate = null, auth = "") => {
    const url = process.env.URL_SHARING_LINK;
    let t = "";
    (await UUID()).split('-').map(x => t += x);
    const data = JSON.stringify({
        path,
        "shareType": 3,
        "tokenCandidate": `${tokenGenerate ? tokenGenerate : (t)}`,
        "password": ""
    });
    //const data = { path, shareType: 3, tokenCandidate: tokenGenerate ? tokenGenerate : await UUID(), password: null }
    return await httpRequest(url, "POST", data, tokenCSRF, auth);
}

const publicShareLink = async(path, tokenCSRF, auth) => {
    let linkClean = "";
    path.split('/').map((x) => x ? (linkClean += `%2F${x}`) : null);
    const urlShare = `${process.env.URL_SHARING_FORMAT}${linkClean}&reshares=true`;
    const urlShareMe = `${process.env.URL_SHARING_FORMAT}${linkClean}&shared_with_me=true`;
    const urlDeleteShares = process.env.URL_DELETE_SHARE;

    const responseLink = (((await httpRequest(urlShare, 'GET', {}, tokenCSRF, auth)).data).ocs).data;

    for (let i = 0; i < responseLink.length; i++) {
        if (responseLink.length - 1 != i) await httpRequest(`${urlDeleteShares}${responseLink[i].id}`, 'DELETE', {}, tokenCSRF, auth);
    }

    await httpRequest(urlShareMe, 'GET', {}, tokenCSRF, auth);

    return responseLink[responseLink.length - 1];
}

module.exports = { generateTokenCSRF, generateShareLink, publicShareLink }