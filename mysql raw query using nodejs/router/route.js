const express = require("express");
const app = express();
const router = express.Router();
const controller = require("../controller/controller");
const { selectDatabase } = require("../middleware");



// Endpoint to create the database
router.post("/createDB", controller.createDB);

// Endpoint to create the table
router.post("/createTable", selectDatabase , controller.createTable);

// Endpoint to add a record to the table
router.post("/addUser", selectDatabase , controller.addUser);

// Endpoint to read all users from the table
router.get("/getUsers", selectDatabase , controller.getUsers);

// Endpoint to update a record in the table
router.post("/updateUser", selectDatabase , controller.updateUser);

// Endpoint to delete a record from the table
router.post("/deleteUser", selectDatabase,  controller.deleteUser);

// Endpoint to truncate the table
router.post("/truncateTable",  selectDatabase , controller.truncateTable);

// Endpoint to drop the table
router.post("/dropTable", selectDatabase ,  controller.dropTable);

// Endpoint to drop the database
router.post("/dropDB" , selectDatabase , controller.dropDB);

module.exports = router;
