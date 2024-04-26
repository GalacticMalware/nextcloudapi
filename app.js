require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const { dbConncet } = require('./database/mysql.conf')
const date = require('perf_hooks')
const schedule = require('node-schedule');

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

    const job = async() => {
        console.log('reporte job');
        schedule.scheduleJob({ second: 0, minute: 0, hour: 15, dayOfWeek: [0, new schedule.Range(1, 5)] },
            function() {
                console.log('se ejecuto = ', new Date().toISOString());
                httpRequest(process.env.URL_REPORT, 'POST');
            });
    }
    job();
});