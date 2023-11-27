const e = require("express");
const { mysqlConnection } = require("../mysqlConnection");

module.exports = {
  createDB: (req, res) => {
    try {
      const { databasename } = req.headers;

      const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databasename}`;
      mysqlConnection.query(createDatabaseQuery, (err, result) => {
        if (err) {
          console.log("Error creating Database.", err.message);
          return res.status(500).send("Error creating Database.");
        }

        res.status(200).send({
          status: 1,
          message: "Database created Successfully",
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  createTable: (req, res) => {
    try {
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL
          )
        `;

      mysqlConnection.query(createTableQuery, (err, result) => {
        if (err) {
          console.log("Error creating table.", err);
          return res.status(500).send("Error creating table.");
        }
        console.log(result);
        res.status(200).send({
          status: 1,
          message: "Table created Successfully",
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  addUser: (req, res) => {
    try {
      const { name, email } = req.body;
  
      const checkEmailQuery = `SELECT COUNT(*) as count FROM users WHERE email = ?`;
  
      mysqlConnection.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
          console.log("Error checking email.", err);
          return res.status(500).send("Error checking email.");
        }
  
        if (result[0].count > 0) {
          return res.status(400).send("Email already exists.");
        } else {
          const insertUserQuery = `
            INSERT INTO users (name, email)
            VALUES (?, ?)
          `;
  
          mysqlConnection.query(insertUserQuery, [name, email], (err, result) => {
            if (err) {
              console.log("Error adding user.", err);
              return res.status(500).send("Error adding user.");
            }
            res.status(200).send({
              status: 1,
              message: "User added Successfully",
              data: result,
            });
          });
        }
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  
  getUsers: (req, res) => {
    try {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);
      if (!Number.isInteger(page) || page < 1) page = 1;
      if (!Number.isInteger(limit) || limit < 1) limit = 5;
      const offset = (page - 1) * limit;

      const selectUsersQuery = `SELECT * FROM users ORDER BY name ASC LIMIT ?, ?`;
      const countUsersQuery = `SELECT COUNT(*) as total FROM users`;

      mysqlConnection.query(
        selectUsersQuery,
        [offset, limit],
        (err, result) => {
          if (err) {
            console.log("Error reading users.", err.message);
            return res.status(500).send(err.message);
          }

          mysqlConnection.query(countUsersQuery, (err, countResult) => {
            if (err) {
              console.log("Error counting users.", err.message);
              return res.status(500).send(err.message);
            }

            const totalRecords = countResult[0].total;
            const totalPages = Math.ceil(totalRecords / limit);
            const hasNextPage = page < totalPages;

            res.status(200).send({
              status: 1,
              message: "Users retrieved Successfully",
              totalRecords,
              totalPages,
              currentPage: page,
              hasNextPage,
              data: result,
            });
          });
        }
      );
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  updateUser: (req, res) => {
    try {
      const userId = req.headers.userid;
      const newName = req.body.name;

      if (!userId || !newName) {
        return res.status(400).send("User ID and new name are required.");
      }

      const updateUserQuery = `
        UPDATE users
        SET name = ?
        WHERE id = ?
      `;

      mysqlConnection.query(
        updateUserQuery,
        [newName, userId],
        (err, result) => {
          if (err) {
            console.log("Error updating user.", err.message);
            return res.status(500).send(err.message);
          }
          res.status(200).send({
            status: 1,
            message: "User updated Successfully",
            data: result,
          });
        }
      );
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  deleteUser: (req, res) => {
    try {
      const userId = req.headers.userid;

      const deleteUserQuery = `
              DELETE FROM users
              WHERE id = ${userId}
            `;

      mysqlConnection.query(deleteUserQuery, (err, result) => {
        if (err) {
          console.log("Error deleting user.", err);
          return res.status(500).send("Error deleting user.");
        }
        res.status(200).send({
          status: 1,
          message: "User deleted Successfully",
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  truncateTable: (req, res) => {
    try {
      const truncateTableQuery = `
            TRUNCATE TABLE users
          `;

      mysqlConnection.query(truncateTableQuery, (err, result) => {
        if (err) {
          console.log("Error truncating table.", err);
          return res.status(500).send("Error truncating table.");
        }
        res.status(200).send({
          status: 1,
          message: "Table truncated Successfully",
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  dropTable: (req, res) => {
    try {
      const dropTableQuery = `
            DROP TABLE IF EXISTS users
          `;

      mysqlConnection.query(dropTableQuery, (err, result) => {
        if (err) {
          console.log("Error dropping table.", err);
          return res.status(500).send("Error dropping table.");
        }
        res.status(200).send({
          status: 1,
          message: "Table dropped Successfully",
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  dropDB: (req, res) => {
    try {

        const databaseName = req.headers.databasename;

      const dropDBQuery = `
        DROP DATABASE IF EXISTS ${databaseName}
      `;

      mysqlConnection.query(dropDBQuery, (err, result) => {
        if (err) {
          console.log("Error dropping database.", err);
          return res.status(500).send("Error dropping database.");
        }
        res.status(200).send({
          status: 1,
          message: "Database dropped Successfully",
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
