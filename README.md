# GUI for MySQL

## Using the GUI

### Clone the project locally

```bash
git clone https://github.com/chakri68/MySQL-gui.git
```

### Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

## Backend

### Configure the backend server

Update values in the [`backendConfig.js`](backendConfig.js) file

```javascript
// Generic backendConfig.js file
{
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
}
```

## Frontend

### Configure the frontend

Update values in the [`frontendConfig.js`](frontendConfig.js) file

```javascript
// Generic frontendConfig.js file
{
  // Backend URL
  serverURL: "http://localhost:3000",
}
```

## Starting the server

### To run both frontend and the backend at the same time, use

```bash
npm run start
```

### To run the frontend and backend in separate processes

For frontend

```bash
npm run frontend
```

For backend

```bash
npm run backend
```

After starting both the servers,

visit [http://localhost:3000](http://localhost:3000) for backend

visit [http://localhost:8080](http://localhost:8080) for frontend.
