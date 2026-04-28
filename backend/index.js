import express from 'express'
import dotenv from 'dotenv'
import db from './models'
const os = require('os')
import path from 'path'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({extended: true})) 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
})

import { AppRoute } from './AppRoute'

app.get('/', (req, res) => {})

app.get('/api/healthcheck', async (req, res) => {
    try{
        await db.sequelize.authenticate();

        const cpuLoad = os.loadavg();

        const memoryUsage = process.memoryUsage();

        const cpus = os.cpus();
        const cpuPercentage = cpuLoad[0] / cpus.length * 100;

        const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2) + ' MB';
        const toGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';

        res.status(200).json({
            status: 'OK',
            database: 'Connected',
            cpuLoad: {
                '1 Minute Average Load': cpuLoad[0].toFixed(2),
                '5 Minute Average Load': cpuLoad[1].toFixed(2),
                '15 Minute Average Load': cpuLoad[2].toFixed(2),
                'CPU Usage Percentage': cpuPercentage.toFixed(2) + "%"
            },

            memoryUsage: {
                rss: toMB(memoryUsage.rss),
                heapTotal: toMB(memoryUsage.heapTotal),
                heapUsed: toMB(memoryUsage.heapUsed),
                external: toMB(memoryUsage.external),
                totalRAM: toGB(os.totalmem()),
                freeRAM: toGB(os.freemem())
            }
        });
    }catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: 'Health check failed',
            error: error.message
        });
    }
});

const port = process?.env?.PORT ?? 3000
AppRoute(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/**
npx sequelize-cli model:generate --name GIOHANG --attributes "" --force

run migrations: 
npx sequelize-cli db:migrate

npx sequelize-cli db:migrate:undo

SELECT * FROM information_schema.table_constraints
    -> WHERE table_schema = 'shop_laptop' AND table_name ='giohangs';
 */