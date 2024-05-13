const { AuthType, createClient } = require("webdav");
const fs = require('fs');
const { generateTokenCSRF, generateShareLink, publicShareLink } = require('../services/generateShare');

const uploadData = async(req, res) => {
    const { user, pass, path } = req.body.client;
    let { folder, name, base64, replay = true, extension } = req.body;
    let originName = name,
        data, pathData;
    let responseUpload;

    try {
        const client = createClient(`${process.env.HOST_NEXTCLOUD}${path}`, {
            //authType: AuthType.Digest,
            username: user,
            password: pass,
        });

        if (req.file) {
            pathData = `${__dirname}/../${req.file.path}`;
            //console.log(req.file)
            originName = req.file.originalname.split('.')[0];
            extension = req.file.mimetype.split('/')[1];
        }

        if (base64) {
            const buffer = Buffer.from(base64, "base64");
            if (extension == "" || extension == null) extension = (buffer.toString()).replace('�', "").split('\r')[0];
            //extension = base64.split(';')[0].split('/')[1] !== 'png' ? 'png' : extension;
            pathData = `${__dirname}/../uploads/${name}.${extension}`;
            let base64Data = base64.split(',')
            if (base64Data.length >= 2) {
                base64Data[1]
            } else base64 = base64;
            //const base64Data = base64.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(`uploads/${name}.${extension}`, base64Data, 'base64');
            originName = name;
        }

        data = fs.readFileSync(pathData);

        folder ? folder = `/${folder}` : folder = "";
        if (!(await client.exists(`/pictures${folder}`))) {
            if (await client.createDirectory(`/pictures${folder}`)) throw (`Errror al generar el folder ${folder}`);
        } //else throw ('La ruta ya existe');

        responseUpload = await client.putFileContents(`/pictures${folder ? folder : ""}/${originName}.${extension}`, data, { overwrite: replay })

        fs.unlinkSync(pathData);

        if (!responseUpload) throw ('El archivo ya existe');

        return res.json({ status: 'sucess', message: 'La carga se completo correctamente', data: { path: `/pictures${folder ? folder : ""}/${originName}.${extension}` } });

    } catch (e) {
        console.log(e)
        return res.json({ status: 'error', message: typeof e == !'string' ? 'Ocurrio un error inesperado' : e });
    }
}

const generateView = async(req, res) => {
    const { url, format, config } = req.body;
    const { user, pass, path } = req.body.client;
    let data, auth, tokenCSFR;
    try {
        const client = createClient(`${process.env.HOST_NEXTCLOUD}${path}`, {
            //authType: AuthType.Digest,
            username: user,
            password: pass,
        });

        switch (format) {
            case 'base64':
                let downloadLink = await client.getFileContents(url);
                const base64 = (Buffer.from(downloadLink, 'utf-8')).toString('base64');

                data = { base64 };
                break;
            case 'shareLink':
                auth = await client.getHeaders().Authorization;
                tokenCSFR = await generateTokenCSRF(auth);
                await generateShareLink(url, tokenCSFR, null, auth);

                data = { url: (await publicShareLink(url, tokenCSFR, auth, config)).url };
                break;
            case 'imgLink':
                auth = await client.getHeaders().Authorization;
                tokenCSFR = await generateTokenCSRF(auth);
                await generateShareLink(url, tokenCSFR, null, auth);
                const tokenIMG = (await publicShareLink(url, tokenCSFR, auth, config)).token;

                data = {
                    url: `${process.env.URL_SHARE_PREVIEW}${tokenIMG}/preview` //{
                        //option1: `${process.env.URL_IMG_LINK}${tokenIMG}${process.env.URL_COMPLEMENT_IMG}${(await client.getDirectoryContents(url))[0].etag}`,
                        //option2: `
                        //}
                };
                break;
            default:
                throw ('Debe de elegir un solo formato por peticion');
                break;
        }

        return res.json({ status: 'sucess', message: 'Generacion exitosa', data });
    } catch (e) {
        console.log(e)
        return res.json({ status: 'error', message: typeof e == !'string' ? 'Ocurrio un error inesperado' : e });
    }
}

module.exports = { uploadData, generateView };