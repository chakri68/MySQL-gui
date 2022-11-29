let primaryKeys = {
  department: "Dnumber",
  employee: "SSN",
  project: "Pnumber",
  works_on: "ESSN",
};

function getTableNames(req, res, con) {
  try {
    con.query(
      `SELECT table_name
      FROM information_schema.tables
      WHERE table_type='BASE TABLE'
            AND table_schema = '${con.config.database}'`,
      function (err, result) {
        if (err) {
          res.send({ success: false, data: null });
          throw err;
        }
        console.log("Result: " + result);
        res.send({ success: true, data: result });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getTableData(req, res, con) {
  try {
    console.log(req);
    con.query(`select * from ${req.body.table}`, function (err, result) {
      if (err) {
        res.send({ success: false, data: null });
        throw err;
      }
      console.log("Result: " + result);
      res.send({ success: true, data: result });
    });
  } catch (error) {
    console.log(error);
  }
}
function addNewRow(req, res, con) {
  console.log(req.body);
  try {
    let cols = Object.keys(req.body.data);
    con.query(
      `insert into ${req.body?.table}(${cols.join(", ")}) values(${cols
        .map((col) => `'${req.body.data[col]}'`)
        .join(", ")})`,
      function (err, result) {
        if (err) {
          res.send({ success: false, data: null });
          throw err;
        }
        console.log("Result: " + result);
        res.send({ success: true, data: result });
      }
    );
  } catch (error) {
    console.log(error);
  }
}
function deleteRow(req, res, con) {
  try {
    con.query(
      `delete from ${req.body.table} where ${req.body.table}.${
        primaryKeys[req.body.table]
      } = ${req.body.data[primaryKeys[req.body.table]]}`,
      function (err, result) {
        if (err) {
          res.send({ success: false, data: null });
          throw err;
        }
        console.log("Result: " + result);
        res.send({ success: true, data: result });
      }
    );
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getTableNames, getTableData, addNewRow, deleteRow };
