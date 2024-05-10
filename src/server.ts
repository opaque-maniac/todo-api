import express from "express";
import morgan from "morgan";
import { login, register } from "./userHandler";
import {
  allowIfAuthenticated,
  denyIfAuthenticated,
} from "./middleware/authMiddleware";
import router from "./router";
import ErrorHandler from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/register", (req, res) => {
  res.send("Hello World");
});

// Routes for managing users
app.post("/register", denyIfAuthenticated, register);
app.post("/login", denyIfAuthenticated, login);

// Routes for the api
app.use("/api", allowIfAuthenticated, router);

app.use((err, req, res, next) => {
  ErrorHandler(err, req, res, next);
});

export default app;
