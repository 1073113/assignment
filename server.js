import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import versionRoutes from "./assignment/assignment.routes.js";
import valuesRoutes from "./value/value.routes.js";
import { handleError } from "./filter/httpException.filter.js";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(apiLimiter);
app.use("/api", versionRoutes);
app.use("/api/values", valuesRoutes);

// app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
