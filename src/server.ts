import express from "express";
import morgan from "morgan";
import { login, register } from "./userHandler";
import {
  allowIfAuthenticated,
  denyIfAuthenticated,
} from "./middleware/authMiddleware";
import router from "./router";
import ErrorHandler from "./utils/errorHandler";
import cors from "cors";

const app = express();

// Implimenting some middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Options for cors
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Implimenting cors
app.use(cors(corsOptions));

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
