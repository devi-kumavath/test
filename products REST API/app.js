const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoDB = require('./database/mongodb');
const productsRouter = require('./routes/products.route');

dotenv.config();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/products', productsRouter);

app.get("/", (req, res) => {
  res.send("Hey, I am live!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const start = async () => {
  try {
    // Validate required environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is missing.");
    }

    await mongoDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit the application on startup error
  }
};

start();
