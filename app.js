require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { dbConncet } = require('./database/mysql.conf')
const a = require('perf_hooks')

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('stogare'));
//app.use(express.urlencoded({ extended: true }));
//app.use(express.bodyParser({ limit: '10mb' }));

app.use("/nextcloud/", require('./routes'));
app.get('/nextcloud/test', (req, res) => res.send('nextcloudapi'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    await dbConncet();
    console.log(`El server es http://localhost:${PORT}`);
    setTimeout(() => {
        console.log('holamundo')
    }, 2000);

});