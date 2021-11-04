import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import Routers from './routes'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

Routers(app)


app.get('/', (reg, res) => {
    const ChangeDB = "USE Dershane1";
        db.query(ChangeDB, (err, results) => {        
            console.log(results)                 
        })
    res.send('REST API V 0.0.1')
})

app.get('/Uzders', (reg, res) => {
    const ChangeDB = "USE Uzders";
        db.query(ChangeDB, (err, results) => { 
            console.log(results)            
        })
    res.send('REST API V 0.0.1')
})

app.listen(2001, () =>  console.log("App listening 2001!"))
