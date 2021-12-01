// Define app using express
var express = require("express")
var app = express()
// Require database SCRIPT file
var db = require('./database.js')

// Require md5 MODULE
var md5 = require('md5')

// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set server port
var HTTP_PORT = 5000

// Start server
app.listen(HTTP_PORT, () => {
    // console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
	console.log('Your API is working!')
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3  
// CREATE a new user (HTTP method POST) at endpoint /app/new/

// figure out the post request
app.post("/app/users", (req,res) => {
	const add = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?").all()
	res.status(201).json(add)
})

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id   ** fix this?
app.get("/app/users:/id", (req, res) => {
	const user_id = req.params.id
	const one_user = db.prepare("SELECT * FROM userinfo WHERE id = " + user_id).all()
	res.status(200).json(one_user)
})

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
