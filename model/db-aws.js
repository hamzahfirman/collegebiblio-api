
const mysql = require('mysql')
const dbCred = require('./db-account');

const db = mysql.createConnection( {
    host: 'cbinstance1.ccpv41wveuxp.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'biblio2021!',
    database: 'collegebiblio'
});

// Connect to DB
db.connect((err) => {
    if(err) throw err;
    console.log('MySql Connected...');
})

// function createUserTable() {
//     let sql = "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))";

//     db.query(sql, (err, result) => {
//         if(err) {
//             throw err;
//         }
//         console.log(result);
//         return result.rows;
//     }
  
//     )
// }

// module.exports = { createUserTable }

