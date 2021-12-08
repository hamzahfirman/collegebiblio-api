 
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
                const query = "SELECT * FROM users;";

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

        
    async insertNewUser(firstName, lastName, phoneNumber, email) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (first_name, last_name, phone_number, email) VALUES (?,?,?,?);";

                connection.query(query, [firstName, lastName, phoneNumber, email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
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
                const query = "SELECT first_name FROM users WHERE email = ?";
            
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
    async getAllClasses() {
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
        }
} 

    async getAllBooks() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM textbook_information;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    } 
    async insertNewBook(title, isbn13,  authors, courseName, sellingPrice, textbookQuality, sellerName, textbookImage) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO textbook_information (textbook_title, isbn_13,  textbook_author, course_name, textbook_price, textbook_condition, seller_name, textbook_image) VALUES (?,?,?,?,?,?,?,?);";
                connection.query(query, [title, isbn13,  authors, courseName, sellingPrice, textbookQuality, sellerName, textbookImage], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            console.log(response);
            return "Success! A new book has been added. "
            ;
        } catch (error) {
            console.log(error);
        }}

    async searchBook(value) {
            try {
                const response = await new Promise((resolve, reject) => {
    
                    const query = "SELECT * FROM textbook_information WHERE textbook_title LIKE '%"+ value +"%';";
                    connection.query(query, (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result);
                    })
                });
                console.log(response);
                return response;
            } catch (error) {
                console.log(error);
            }}
    }

module.exports = DbService;

