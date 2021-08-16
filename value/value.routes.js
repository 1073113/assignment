import express from "express";
import { findAll } from "./value.controllers.js";

const router = express.Router();

router.route("/find-all").get(findAll);

export default router;
