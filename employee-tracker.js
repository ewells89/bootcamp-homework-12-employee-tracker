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
  database: "top_songsDB"
});

// ==============================================================================
// DATABASE CONNECTION
// ==============================================================================

connection.connect(function(err) {
  if (err) throw err;
  runTracker();
});

// ==============================================================================
// FUNCTIONS
// ==============================================================================

function runTracker (){
  console.log("It works!");
}