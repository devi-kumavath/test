const { mysqlConnection } = require("./mysqlConnection");

const selectDatabase = (req, res, next) => {
  const { databasename } = req.headers;
  const useDB = `USE ${databasename}`;

  mysqlConnection.query(useDB, (err, result) => {
    if (err) {
      console.log("Error selecting database.", err);
      return res.status(500).send("Error selecting database.");
    }
    // console.log("Database selected");
    next();
  });
};

module.exports = {
  selectDatabase,
};
