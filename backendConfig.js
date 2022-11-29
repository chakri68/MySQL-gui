// Primary Keys are required for deleting rows

module.exports = {
  // The port the server should listen at
  port: 3000,
  // The database to connect to
  database: {
    // The hostname
    host: "localhost",
    // User
    user: "root",
    // Password for the user
    password: "2004",
    // The database name
    database: "company",
  },
  // The keys that uniquely identify rows of each table in the database
  primaryKeys: {
    // [table_name]: "[column_name]"
    department: "Dnumber",
    employee: "SSN",
    project: "Pnumber",
    works_on: "ESSN",
  },
};
