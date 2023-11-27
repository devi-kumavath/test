const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

//mongo connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to mongodb"));

//middle ware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "my secert key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));

//set template engine
app.set("view engine", "ejs");

app.use("", require("./routes/router"));

app.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`);
});
