const express = require("express");
const connectDB = require("./config/db");

const app = express();
const dotenv = require("dotenv");

const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

dotenv.config({ path: "./config/config.env" });

//routes import
const users = require("./routes/users");

app.use("/api/v1/users", users);

connectDB();

const server = app.listen(PORT, console.log(`Server is running on port ${process.env.PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
