import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

import { AppRoute } from './AppRoute'

app.get('/', (req, res) => {})

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