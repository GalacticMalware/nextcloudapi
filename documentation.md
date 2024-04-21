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