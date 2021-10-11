
const mysql = require('mysql')
const dotenv = require('dotenv');
let instance = null;
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

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users";

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
  

}}

module.exports = DbService;

