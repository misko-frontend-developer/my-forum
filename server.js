const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Body parser
app.use(express.json());

const dotenv = require("dotenv");

const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

dotenv.config({ path: "./config/config.env" });

//routes import
const users = require("./routes/users");
const communities = require("./routes/communities");
const auth = require("./routes/auth");

app.use("/api/v1/users", users);
app.use("/api/v1/community", communities);
app.use("/api/v1/auth", auth);

connectDB();

const server = app.listen(PORT, console.log(`Server is running on port ${process.env.PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
