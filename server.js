// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    //mysql password here
    password: "",
    database: "employees_db",
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
  db.query("SELECT * FROM employee", (err, data) => {
    console.log(data);
    menu();
  });
}

function addDepartment(name) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department you would like to add?",
        name: "newdepartment",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answers.newdepartment,
        (err, data) => {
          console.log(data);
          menu();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role you would like to add?",
        name: "newrole",
      },
      {
        type: "input",
        message: "What is the salary associated with this role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department id?",
        name: "departmentid",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answers.newrole, answers.salary, answers.departmentid],
        (err, data) => {
          console.log(data);
          menu();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the employee's role?",
        name: "roleid",
      },
      {
        type: "input",
        message: "What is the employee's manager id?",
        name: "managerid",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answers.first_name,
          answers.last_name,
          answers.roleid,
          answers.managerid,
        ],
        (err, data) => {
          console.log(err);
          console.log(data);
          menu();
        }
      );
    });
}

function updateEmployee() {
  db.query("SELECT * FROM employee", (err, employeedata) => {
    db.query("SELECT * FROM role", (err, roledata) => {
      inquirer
        .prompt([
          {
            type: "list",
            message: "What employee you would like to update",
            choices: [employeedata],
            name: "employeename",
          },
          {
            type: "list",
            message: "What is employee's new role?",
            choices: [roledata],
            name: "update",
          },
        ])
        .then((answers) => {
          db.query(
            "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?",
            [answers.update, answers.employeename],
            (err, data) => {
              console.log(data);
              menu();
            }
          );
        });
    });
  });
}

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
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
        addDepartment();
      }
      if (answers.init === "add a role") {
        addRole();
      }
      if (answers.init === "add an employee") {
        addEmployee();
      }
      if (answers.init === "update an employee role") {
        updateEmployee();
      }
      if (answers.init === "exit") {
        process.exit();
      }
    });
}

menu();
// fs.writeFile("index.html", htmlPageContent, (err) =>
//   err ? console.log(err) : console.log("Successfully created index.html!")
// );
