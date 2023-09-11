const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRoutes");
const AuthController = require("./controllers/authController");
const roleRouter = require("./routes/roleRouters");
const globalErrorHandler = require("./controllers/errorController");

var morgan = require("morgan");

// 1) MIDLEWARES
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://mern-demo.netlify.app",
      "http://localhost:3002",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["X-Requested-With", "content-type"],
    credentials: true,
  })
);

// 2) Route
app.post("/api/login", AuthController.login);
app.post("/api/signup", AuthController.signUp);
app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(globalErrorHandler);

module.exports = app;
