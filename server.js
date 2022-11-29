const mysql = require("mysql");
const express = require("express");
const {
  getTableNames,
  getTableData,
  addNewRow,
  deleteRow,
} = require("./funcs");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2004",
  database: process.argv.slice(2)[0] || "company",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tables", (req, res) => {
  try {
    getTableNames(req, res, con);
  } catch (err) {
    console.log(err);
  }
});
app.post("/tableData", (req, res) => {
  try {
    getTableData(req, res, con);
  } catch (err) {
    console.log(err);
  }
});
app.post("/addRow", (req, res) => {
  try {
    addNewRow(req, res, con);
  } catch (err) {
    console.log(err);
  }
});
app.post("/deleteRow", (req, res) => {
  try {
    deleteRow(req, res, con);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
