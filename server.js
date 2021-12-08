// Loads up Express module
const express = require("express");
const app = express(); // Object
const formData = require("express-form-data");
const port = process.env.PORT || 3001; // PORT
const fileUpload = require("express-fileupload");

const bodyParser = require("body-parser");
const cors = require("cors");

const data = require("./server/data");
const dbService = require("./model/db-aws");
const bcrypt = require("bcryptjs");

// Middleware to send JSON
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(formData.parse());
// app.engine('hbs', exphbs({ extname: '.hbs' }));
// app.set('view engine', 'hbs');

// Route handler or callback function
app.get("/", (req, res) => {
  res.send("Welcome to CollegeBiblio");
});

/*  USERS ENDPOINTS  */

app.get("/api/users", (req, res) => {
  // Returns all users
  const model = dbService.getDbServiceInstance();

  const result = model.getAllUsers();

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.post("/api/users/signup", async (req, res) => {
  // Returns a new data when sign up
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;

    const model = dbService.getDbServiceInstance();

    result = model.insertNewUser(
      firstName.toLowerCase(),
      lastName.toLowerCase(),
      phoneNumber.toLowerCase(),
      email.toLowerCase()
    );

    result
      .then((data) => res.json({ message: data }))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
    res.status(500).send("Invalid information have been inserted!");
  }
});

app.post("/api/users/login", async (req, res) => {
  // Returns a user when login

  try {
    const { email } = req.body;
    const model = dbService.getDbServiceInstance();
    console.log(req.body);

    const result = model.getAUser(email.toLowerCase());

    result
      .then((data) =>
        data.length != 0
          ? res.json(data)
          : res.send("Please finish your profile.")
      )
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
    res.status(500).send("Invalid information have been inserted!");
  }
});
// /*  BOOKS ENDPOINTS  */

app.get("/api/books", (req, res) => {
  // Returns all books
  const model = dbService.getDbServiceInstance();

  const result = model.getAllBooks();

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.post("/api/books/new", (req, res) => {
  // Sends a new book data
  //
  try {
    const {
      title,
      isbn13,
      author,
      courseName,
      sellingPrice,
      textbookQuality,
      sellerName,
      textbookImage
    } = req.body;
    const model = dbService.getDbServiceInstance();

    console.log(req.body);
    const result = model.insertNewBook(
      title,
      isbn13,
      author,
      courseName,
      sellingPrice,
      textbookQuality,
      sellerName,
      textbookImage
    );

    result
      .then((data) => res.json({ message: data }))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
    res.status(500).send("Invalid information have been inserted!");
  }
});

app.post("/api/books/search", (req, res) => {
  // Sends a new book data
  //
  try {
    const {
      search 
    } = req.body;
    const model = dbService.getDbServiceInstance();
    const result = model.searchBook(
      search
    );

    result
      .then((data) => res.json({ data: data }))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
    res.status(500).send("Invalid information have been inserted!");
  }
});

/*  CLASSES ENDPOINTS  */

app.get("/api/classes", (req, res) => {
  // Returns all classes
  const model = dbService.getDbServiceInstance();

  const result = model.getAllClasses();

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

/* Image Uploads */


app.post("/api/books/image", (req, res) => {
  let sampleFile;
  let uploadPath;

  console.log(req.files);
  //   console.log(req);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  //   sampleFile = req.body.sampleFile.split("\\");
  //   uploadPath = __dirname + "/uploads/" + sampleFile[2];

  //  console.log(sampleFile);

  // Use mv() "move" function to place image file on the server
  //   sampleFile.mv(uploadPath, function (err) {
  //     if (err) return res.status(500).send(err);

  //     res.send("File uploaded!");
  //   });
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);

// Heroku URL: https://collegebiblioapi.herokuapp.com/
