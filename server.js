// Loads up Express module
const express = require('express');
const app = express();  // Object
const port = process.env.PORT || 3000; // PORT 

const bodyParser = require('body-parser');
const cors = require('cors');

const data = require('./server/data');
const dbService = require('./model/db-aws');

// Middleware to send JSON

app.use(cors());
app.use(express.json());



// Route handler or callback function
app.get('/', (req, res) => {
    res.send("Welcome to CollegeBiblio")
});

/*  USERS ENDPOINTS  */

app.get('/api/users', (req, res) => {   // Returns all users 
    const model = dbService.getDbServiceInstance();

    const result = model.getAllData();
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
 
})

app.post('/api/users', (req, res) => {   // Returns all users 
    const user = {
        id: data.users.length + 1,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password
    };
    data.users.push(user);
    res.send(user);
})

app.get('/api/users/:name', (req, res) => {  // Returns a user
    const user = data.users.find(c => c.name.toLowerCase() === req.params.name.toLowerCase());

    if(!user) {
        res.status(404).send('The user is not found!')
    } 
    res.send(user)
})


/*  BOOKS ENDPOINTS  */

// app.get('/api/books', (req, res) => {   // Returns all  books
//     res.send(["Quantative Research Methods for Communication"])
// })

// app.get('/api/books/:id', (req, res) => {  // Returns a book
//     const books = books.find(c => c.id === parseInt(req.params.id));

//     if(!books) {
//         res.status(404).send('The book is not found!')
//     } 
//     res.send()
// })



app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))

// Heroku URL: https://collegebiblioapi.herokuapp.com/