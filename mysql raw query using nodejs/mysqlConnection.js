const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
});

module.exports = {
  mysqlConnection,
};
