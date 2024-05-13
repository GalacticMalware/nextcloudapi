
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


#### GENERATE FROM SHARED DATA URL

```http
  POST nextcloud/storage/generateView
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url`      | `string` | **Require**. URL generated from uploaded data  |
| `format`      | `string` | **Required**. Type of formats to generate ['shareLink','base64','imgLink']  |
| `config`      | `object` | **Opcional**. Data sharing settings  |
{
    | `permissions`     | `string` | **Optional**. Types of permissions ['17'](Read) - ['19'](Edit)  |
    | `attributes`      | `string` | **Optional**. Types of permissions ['17'](Read) - ['19'](Edit)  |
    | `note`      | `string` | **Optional**. Types of permissions ['17'](Read) - ['19'](Edit)  |
    | `expireDate`      | `string` | **Optional**. Types of permissions ['17'](Read) - ['19'](Edit)  |
    | `label`      | `string` | **Optional**. Types of permissions ['17'](Read) - ['19'](Edit)  |
    | `password`      | `string` | **Optional**.  |
    | `hideDownload`      | `string` | **Optional**.   |
    
}






## Authors

- [@Daniel Alejandro](https://github.com/GalacticMalware)
