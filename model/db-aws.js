import dbCred from './db-account'

const mysql = require('mysql')


const db = mysql.createConnection( {
    host: dbCred.host,
    user: dbCred.user,
    password: dbCred.password,
    database: dbCred.database
});

// Connect to DB
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
})

function createUserTable() {
    let sql = "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))";

    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        return result.rows;
    }
  
    )
}

module.exports = { createUserTable }

