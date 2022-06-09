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

function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, data) => {
    console.log(data);
    menu();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM roles", (err, data) => {
    console.log(data);
    menu();
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employees", (err, data) => {
    console.log(data);
    menu();
  });
}

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        options: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
        name: "init",
      },
    ])
    .then((answers) => {
      if (answers.init === "view all departments") {
        viewAllDepartments();
      }
      if (answers.init === "view all roles") {
        viewAllRoles();
      }
      if (answers.init === "view all employees") {
        viewAllEmployees();
      }
      if (answers.init === "add a department") {
      }
      if (answers.init === "add a role") {
      }
      if (answers.init === "add an employee") {
      }
      if (answers.init === "update an employee role") {
      }
    });
}
// fs.writeFile("index.html", htmlPageContent, (err) =>
//   err ? console.log(err) : console.log("Successfully created index.html!")
// );
// {
//   type: "input",
//   message: "What is your department id?",
//   name: "department_id",
// },
// {
//   type: "input",
//   message: "What is your department name?",
//   name: "department_name",
// },

// TABLE role:
//     {
//       type: "input",
//       message: "What is the employee's id #?",
//       name: "role_id",
//     },
//     {
//       type: "input",
//       message: "What is the employee's title?",
//       name: "role_title",
//     },
//     {
//       type: "input",
//       message: "What is the employee's salary?",
//       name: "role_salary",
//     },
//     {
//       type: "input",
//       message: "What is the employee's department id?",
//       name: "role_departmentid",
//     },

// TABLE employee:
//     {
//       type: "input",
//       message: "What is the employee's id #?",
//       name: "employee_id",
//     },
//     {
//       type: "input",
//       message: "What is the employee's first name?",
//       name: "employee_firstname",
//     },
//     {
//       type: "input",
//       message: "What is the employee's last name?",
//       name: "employee_lastname",
//     },
//     {
//       type: "input",
//       message: "What is the employee's role id?",
//       name: "employee_roleid",
//     },
//     {
//       type: "input",
//       message: "What is the id # for the manager of the employee?",
//       name: "employee_managerid",
//     },
