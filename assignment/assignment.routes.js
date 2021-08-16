import express from "express";
import {
  createOrUpdate,
  findAll,
  findOneByKey,
} from "./assignment.controllers.js";

const router = express.Router();

router.route("/").post(createOrUpdate);
router.route("/find-all").get(findAll);
router.route("/:mykey").get(findOneByKey);

export default router;
