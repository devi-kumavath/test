const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const router = require("./router/route");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api", router);

app.get("/health", (req, res) => {
  res.send("All Good");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
