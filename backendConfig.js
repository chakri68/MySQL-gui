// Primary Keys are required for deleting rows

module.exports = {
  port: 3000,
  primaryKeys: {
    department: "Dnumber",
    employee: "SSN",
    project: "Pnumber",
    works_on: "ESSN",
  },
  database: {
    host: "localhost",
    user: "root",
    password: "2004",
    database: "company",
  },
};
