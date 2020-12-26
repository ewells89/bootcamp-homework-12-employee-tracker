// ==============================================================================
// DEPENDENCIES
// ==============================================================================

const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");
const { title } = require("process");

// ==============================================================================
// DATABASE CONFIGURATION
// ==============================================================================

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "potato16",
  database: "employee_trackerDB"
});

// ==============================================================================
// DATABASE CONNECTION
// ==============================================================================

connection.connect(function(err) {
  if (err) throw err;
  console.log(" ______________________________________________________________________________________________\n|    ______                __                         __  ___                                  |\n|   / ____/___ ___  ____  / /___  __  _____  ___     /  |/  /___ _____  ____ _____ ____  _____ |\n|  / __/ / __ `__ \\/ __ \\/ / __ \\/ / / / _ \\/ _ \\   / /|_/ / __ `/ __ \\/ __ `/ __ `/ _ \\/ ___/ |\n| / /___/ / / / / / /_/ / / /_/ / /_/ /  __/  __/  / /  / / /_/ / / / / /_/ / /_/ /  __/ /     | \n|/_____/_/ /_/ /_/ .___/_/\\____/\\__, /\\___/\\___/  /_/  /_/\\__,_/_/ /_/\\__,_/\\__, /\\___/_/      |\n|               /_/            /____/                                      /____/              |\n|______________________________________________________________________________________________|")
  runTracker();
});

// ==============================================================================
// FUNCTIONS
// ==============================================================================

const runTracker = () => {
  inquirer
    .prompt({
      name:"action",
      type:"rawlist",
      message:"What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add a New Department",
        "Add a New Role",
        "Add a New Employee",
        "Manage Employee Roles"
      ]
    })
    .then(answer => {
      switch(answer.action){
        case "View All Employees":
          viewEmployees();
          break;
        
        case "View All Roles":
          viewRoles();
          break;
        
        case "View All Departments":
          viewDepartments();
          break;

        case "Add a New Department":
          addDepartment();
          break;
        
        case "Add a New Role":
          addRole();
          break;

        case "Add a New Employee":
          addEmployee();
          break;

        case "Manage Employee Roles":
          manageRoles();
          break;
      }
    });
};



const viewEmployees = () => {
  connection.query("select * from employee;", (err,res) => {
    console.table(res);
    console.log("================================================================================================");
    runTracker();
  });
};


const viewRoles = () => {
  connection.query("select * from role;", (err,res) => {
    if(err) throw err;
    console.table(res);
    console.log("================================================================================================"),
    runTracker()
  });
};

const viewDepartments = () => {
  connection.query("select * from department;", (err,res) => {
    console.table(res);
    console.log("================================================================================================"),
    runTracker()
  })  
};


const addDepartment = () => {
  console.log("Add a department.");
  inquirer
    .prompt({
      type:'input',
      name: 'deptName',
      message: 'Please specify the name of the new department:'
    })
    .then(answer =>{
      console.log(answer.deptName);    
      connection.query(
        "INSERT INTO department (name) VALUES (?)", 
        [answer.deptName],
        (err,res) => {
          if(err) throw err;
          console.log(`"New department ${answer.deptName} has been added."`);
          console.log("================================================================================================");
          runTracker();
        }
      )
    });
};

const addRole = () => {
  const getDeptList = "SELECT name FROM DEPARTMENT";
  connection.query(getDeptList, (err,res) => {
    inquirer
    .prompt([
      {
      type:'input',
      name: 'roleName',
      message: 'Please specify the name of the new role:'
      },
      {
        type:'input',
        name: 'salary',
        message: 'Please specify the salary for this position:'
      },
      {
        type:'list',
        name: 'department',
        message: 'Which department does this role belong to:',
        choices: res
      },
    ])
    .then(answer =>{
      console.log(answer.roleName);    
      connection.query(
        "INSERT INTO role (title,salary,department_id) VALUES (?,?,(select id from department where name = ?))", 
        [answer.roleName, answer.salary, answer.department],
        (err,res) => {
          if(err) throw err;
          console.log(`"New role ${answer.roleName} has been added."`);
          console.log("================================================================================================");
          runTracker();
        }
      )
    });
  })
};

const addEmployee = () => {
  console.log("Please enter the new employee's information.");
  let getRoleList = "SELECT title FROM role";
  connection.query(getRoleList, (err,res) => {
    // console.log(res);
    inquirer
    .prompt([
      {
      type:'input',
      name: 'firstName',
      message: 'First Name:'
      },
      {
        type:'input',
        name: 'lastName',
        message: 'Last Name:'
      },
      {
        type:'list',
        name: 'role',
        message: "Please select the employee's role:",
        choices: res
      },
    ])
    .then(answer =>{
      console.log(answer.roleName);    
    });
  });
};


const manageRoles = () => {
  const getDeptList = "SELECT title FROM ROLE";
  connection.query(getDeptList, (err,res) => {
    inquirer
    .prompt([
      {
      type:'list',
      name: 'modifyRole',
      message: 'Which role would like to modify?',
      choices: [res]
      },
      {
        type:'input',
        name: 'newRoleName',
        message: 'Please indicate the new name for this role:'
      },
    ])
    .then(answer =>{
      console.log(answer.modifyRole);    
      // connection.query(
      //   "UPDATE role SET title = ? where title = ?", 
      //   [answer.newRoleName, answer.modifyRole],
      //   (err,res) => {
      //     if(err) throw err;
      //     console.log(`"Role ${answer.modifyRole} has been updated to ${answer.newRoleName}."`);
      //     console.log("================================================================================================");
      //     runTracker();
      //   }
      // )
    });
  })
};