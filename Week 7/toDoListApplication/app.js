const express = require("express");
const static = require("serve-static");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const hostname = "localhost";
const port = process.env.PORT || 4000;
mongoose.set('strictQuery', true);
// Don't forget to start your Database server first!
// on Mac using brew:
// brew services start mongodb-community
// Check the status to make sure the server is running
// const DB_SERVER = "mongodb://127.0.0.1:27017";
// const database = "toDoList";
// mongoose.connect(`${DB_SERVER}/${database}`)
mongoose.connect(`${process.env.DB_SERVER}`)
.then(() => {console.log("Connected to database server...");})
.catch((err) => {console.log(err);})


const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(static(__dirname +"/public"));

// app.get("/hey", (req, res)=>{
//   console.log("here we are");
//   console.log("in back");
//   const user = {name: "Ana"};
//   res.json(user);
// })
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// app.get("/", (req, res)=>{
//   res.redirect("/tasks");
// })


app.listen({path:hostname, port: port}, (error) =>{
  if(error) console.log("Error!");
  else console.log(`Server is running on port ${port}...`);
})
