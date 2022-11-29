const mysql = require("mysql");
const express = require("express");
const { getTableNames } = require("./funcs");
const app = express();
const port = 3000;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2004",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});


con.query(`SELECT table_name
FROM information_schema.tables
WHERE table_type='BASE TABLE'
      AND table_schema = 'company'`, function (err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
    // res.send({ success: true, data: result });
  });
  con.end();


  








