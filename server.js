const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

const inquirer = require("inquirer");
const fs = require("fs");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    //mysql password here
    password: "",
    database: "",
  },
  console.log(`Connected to the employees_db database.`)
);

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your department id?",
      name: "department_id",
    },
    {
      type: "input",
      message: "What is your department name?",
      name: "department_name",
    },
  ])
  .then((answers) => {
    //build manager here with class
    const newDepartment = new Department(answers.department_id);
    department.push(newDepartment);
    menu();
  });

fs.writeFile("index.html", htmlPageContent, (err) =>
  err ? console.log(err) : console.log("Successfully created index.html!")
);
