
# Documentation

Generation of resources through NextCloud services API

## NextCloud

 - [NextCloud](http://104.254.244.123:8080/)
 
## Used by

This project is used for testing.:

- Any types of projects


## 🛠 Skills
Javascript, HTML, CSS, NodeJs, Mysql, Php.


## API Reference

#### Generate Token

```http
  POST /nextcloud/login/generateToken
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `string` | **Required**. User in Next Cloud |
| `pass` | `string` | **Required**. Pass in Next Cloud |
| `path` | `string` | **Required**. Path in Next Cloud |

#### UPLOAD DATA IN NEXTCLOUD

```http
  POST nextcloud/storage/uploadData
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `folder`      | `string` | **Optional**. Name of the folder where the file will be saved data  |
| `name`      | `string` | **Required**. Data name  |
| `extension`      | `string` | **Required**. Data extension  |
| `base64`      | `string` | **Required**. Data in base64 format  |



## Authors

- [@octokatherine](https://github.com/GalacticMalware)





{
    "folder":"nombre carpeta",
    "nameImg":"nombre imagen",
    "base64":"forma de la imagen base64", 
    "replay":true //si requiere remplazar el documento
}



Para generar el token JWT
https://104.254.244.123/nextcloud/login/generateToken
{
    "user":"",
    "pass":"",
    "path":""
}

Para subir la imagen
https://104.254.244.123/nextcloud/storage/uploadData
{
    "folder":"nombre carpeta",
    "name":"nombre del archivo", 
    "replay":true //si requiere remplazar el documento
    "extension":"" //NOTA SI LO DEJA POR DEFAULT, ESTE GENERADA UNO ALEATORIAMENTE
    "base64":"forma de la imagen base64",
}
NOTA: ACEPTA FORMATOS POR MULTIFORMAT HTML CON EL NOMBRE DE ("file");



Para generar el link de compartir
https://104.254.244.123/nextcloud/storage/generateView
{
    "url":"", //URL EL CUAL DEVUEL LA SUBIDA DE IMAGEN
    "format":""
}

formato hay 3
base64 -- base 64 
imgLink -- carga de imagen web (NOTA: El nombre del archivo no es el mismo por que lo genera por  token)
shareLink -- link de compartir img para descargar