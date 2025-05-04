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
const posts = require("./routes/posts");
const comments = require("./routes/comments");

app.use("/api/v1/users", users);
app.use("/api/v1/community", communities);
app.use("/api/v1/auth", auth);
app.use("/api/v1/posts", posts);
app.use("/api/v1/comments", comments);

const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

app.use(mongoSanitize());
app.use(xssClean());
app.use(helmet());

const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});
const hpp = require("hpp");

app.use(hpp());

app.use(cors());

app.use(limiter);

connectDB();

const server = app.listen(PORT, console.log(`Server is running on port ${process.env.PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
