 
const mysql = require('mysql')
const dotenv = require('dotenv');
let instance = null;
const bcrypt = require('bcryptjs');
dotenv.config();

var config =  {host:"collegebiblioserver.mysql.database.azure.com",
user:"cbadmin", password:"Biblio!2021", database:"collegebiblio",
 port:3306, ssl:true}

const connection = new mysql.createConnection(config);

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
            return "Success! A new user has been added. "
           
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
    

    }   
        // async getAllClasses() {
        //     try {
        //         const response = await new Promise((resolve, reject) => {
        //             const query = "SELECT DISTINCT name, phonenumber, email, password FROM users";
    
        //             connection.query(query, (err, results) => {
        //                 if (err) reject(new Error(err.message));
        //                 resolve(results);
        //             })
        //         });
        //         // console.log(response);
        //         return response;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } 

        // async getAllBooks() {
        //     try {
        //         const response = await new Promise((resolve, reject) => {
        //             const query = "SELECT DISTINCT name, phonenumber, email, password FROM users";
    
        //             connection.query(query, (err, results) => {
        //                 if (err) reject(new Error(err.message));
        //                 resolve(results);
        //             })
        //         });
        //         // console.log(response);
        //         return response;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } 
        // async insertNewBook(title, author, courseName, price, photoFront, photoBack, photoInside) {
        //     try {
        //         const insertId = await new Promise((resolve, reject) => {
        //             const query = "INSERT INTO books (title, author, courseName, price, photoFront, photoBack, photoInside) VALUES (?,?,?,?,?,?,?);";
    
        //             connection.query(query, [title, author, courseName, price, photoFront, photoBack, photoInside], (err, result) => {
        //                 if (err) reject(new Error(err.message));
        //                 resolve(result.insertId);
        //             })
        //         });
        //         // console.log(response);
        //         return "Success! A new book has been added. "
        //         ;
        //     } catch (error) {
        //         console.log(error);
        //     }}
        }

module.exports = DbService;

