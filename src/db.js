import mysql from 'mysql';
import dbConfig from './db.config'

const connection = mysql.createConnection(dbConfig)

connection.connect(err => {
    if(err){
        return err;
    }
});
 
module.exports = connection
