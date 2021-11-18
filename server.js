// Loads up Express module
const express = require('express');
const app = express();  // Object
const port = process.env.PORT || 3001; // PORT 

const bodyParser = require('body-parser');
const cors = require('cors');

const data = require('./server/data');
const dbService = require('./model/db-aws');
const bcrypt = require('bcryptjs');


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
    
    const result = model.getAllUsers();
    
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err));
 
})

app.post('/api/users/signup', async (req, res) => {   // Returns a new data when sign up
   try{
    const {name, phoneNumber, email, password} = req.body;
    const saltRounds = 10;
    const myPlaintextPassword = password;
  

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        if(err) {
            throw err
        }else {

        const model = dbService.getDbServiceInstance();
    

        result = model.insertNewUser(name.toLowerCase(), phoneNumber.toLowerCase(), email.toLowerCase(), hash);
    
        result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err));
    }
    })

   }catch(e){
        console.log(e);
        res.status(500).send('Invalid information have been inserted!')
   }
    
});

app.post('/api/users/login', async (req, res) => { // Returns a user when login 

    try{
        const {email, password} = req.body;
        const model = dbService.getDbServiceInstance();
        
        const result = await model.getAUser(email.toLowerCase());
        if(result.length == 0){
            res.json("User is not found! Please try again.")
        }

        const validPassword = await bcrypt.compare(password, result[0].password);
        

        validPassword ? res.json({data: result}) : res.json("User not found!");
        

    }catch(e){
        console.log(e);
        res.status(500).send('Invalid information have been inserted!')
        
    }
})

app.get('/api/users/:name', (req, res) => {  // Returns a user
    const user = data.users.find(c => c.name.toLowerCase() === req.params.name.toLowerCase());

    if(!user) {
        res.status(404).send('The user is not found!')
    } 
    res.send(user)
})




/*  BOOKS ENDPOINTS  */

// app.get('/api/books', (req, res) => {   // Returns all books 
//     const model = dbService.getDbServiceInstance();
    
//     const result = model.getAllBooks();
    
//     result
//     .then(data => res.json({data : data}))
//     .catch(err => console.log(err));
 
// })

//  app.get('/api/classes', (req, res) => {   // Returns all classes
//     const model = dbService.getDbServiceInstance();
    
//     const result = model.getAllClasses();
    
//     result
//     .then(data => res.json({data : data}))
//     .catch(err => console.log(err));
 
// })

// app.post('/api/books/new', (req, res) => {  // Sends a new book data   
//     // 
//   try{
//     const {title, author, courseName, price, photoFront, photoBack, photoInside} = req.body;
//     const model = dbService.getDbServiceInstance();
    
//     const result =  model.insertNewBook(title, author, courseName, price, photoFront, photoBack, photoInside);
   

//   }catch(e){
//         console.log(e);
//         res.status(500).send('Invalid information have been inserted!')
        
//  }})



app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))

// Heroku URL: https://collegebiblioapi.herokuapp.com/