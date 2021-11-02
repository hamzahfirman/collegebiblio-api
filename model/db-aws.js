
const mysql = require('mysql')
const dotenv = require('dotenv');
let instance = null;
const bcrypt = require('bcryptjs');
dotenv.config();


const connection = mysql.createConnection( {
    host: 'cbinstance1.ccpv41wveuxp.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'biblio2021!',
    database: 'collegebiblio'
});

// Connect to DB
connection.connect((err) => {
    if(err) throw err;
    console.log('MySql Connected...');
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT DISTINCT name, phonenumber, email, password FROM users";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }}

        
    async insertNewUser(name, phoneNumber, email, password) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (name, phonenumber, email, password) VALUES (?,?,?,?);";

                connection.query(query, [name, phoneNumber, email, password], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            // console.log(response);
            return {
                id: insertId,
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            };
        } catch (error) {
            console.log(error);
        }}

        async getAUser(email) {
            try {
                const response = await new Promise((resolve, reject) => {
                    const query = "SELECT * FROM users WHERE email = ?";
                
                    connection.query(query,[email], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
                });
                console.log(response);
                return response;
            } catch (error) {
                console.log(error);
            }
  

}}

module.exports = DbService;

