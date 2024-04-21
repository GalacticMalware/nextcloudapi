const express = require('express');
const router = express.Router();
const fs = require('fs');

const removeExtension = (file) => file.split('.').shift();

fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file);
    console.log(`ruta ====> ${name}`);
    if (name !== 'index') router.use(`/${name}`, require(`./${file}`));
});

module.exports = router;