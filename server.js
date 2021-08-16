import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import versionRoutes from "./assignment/assignment.routes.js";
import valuesRoutes from "./value/value.routes.js";
import { handleError } from "./filter/httpException.filter.js";
import xss from "xss-clean";
import hpp from "hpp";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

import path from "path";
const __dirname = path.resolve();

if (process.env.NODE_ENV) {
  dotenv.config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
  });
} else {
  dotenv.config();
}
console.log(`${__dirname}/.env.${process.env.NODE_ENV}`);
connectDB();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Sanatize data
app.use(mongoSanitize());

// Security header
app.use(helmet());

// sanitize user input
app.use(xss());

// rate Limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use(apiLimiter);

// protect against HTTP Parameter
app.use(hpp());

// Enable cors
app.use(cors());

// Routes
app.use("/api", versionRoutes);
app.use("/api/values", valuesRoutes);

// Http Handler
app.use(handleError);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
