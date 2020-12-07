// ==============================================================================
// DEPENDENCIES
// ==============================================================================

const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

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

function runTracker (){
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
    .then(function(answer){
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



function viewEmployees(){
  connection.query("select * from employee;", function(err,res){
    console.table(res);
    console.log("================================================================================================");
    runTracker();
  });
};


function viewRoles(){
  connection.query("select * from role;", function(err,res){
    if(err) throw err;
    console.table(res);
    console.log("================================================================================================"),
    runTracker()
  });
};

function viewDepartments() {
  connection.query("select * from department;", function(err,res){
    console.table(res);
    console.log("================================================================================================"),
    runTracker()
  })  
};


function addDepartment(){
  console.log("Add a department.");
  runTracker();
};

function addRole(){
  console.log("Add a role.");
  runTracker();
};

function addEmployee(){
  console.log("Add an employee.");
  runTracker();
};


function manageRoles(){
  console.log("Manage Roles.");
  runTracker();
};