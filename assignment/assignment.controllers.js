import asyncHandler from "express-async-handler";
import { ErrorHandler } from "../filter/httpException.filter.js";

import formatToISODate from "../utils/formatToISODate.js";
import formatToLocalTime from "../utils/formatToLocalTime.js";
import formatToTimeStamp from "../utils/formatToTimeStamp.js";
import isJSON from "../utils/isJson.js";
import ValueService from "../value/value.service.js";
import assignmentModel from "./assignment.model.js";
import AssignmentServices from "./assignment.services.js";

const assignmentServices = new AssignmentServices();
const valueService = new ValueService();
// @desc    on Create Or Update single assignment
// @route   POST /
const createOrUpdate = asyncHandler(async (request, response) => {
  const body = request.body;

  if (!Object.keys(body).length) {
    throw new ErrorHandler(400, "Body payload is empty");
  }

  if (Object.keys(body).length > 1) {
    throw new ErrorHandler(400, "More than one object, request denied");
  }

  const key = Object.keys(body)[0];
  const value = isJSON(body[key]) ? JSON.stringify(body[key]) : body[key];

  const assignment = await assignmentServices.findByKey(key);

  if (assignment) {
    // On Update
    assignment.value = value;
    assignment.timestamp = Date.now();

    try {
      const data = await assignment.save();

      await valueService.create(assignment);

      const parsedValue = isJSON(data.value)
        ? JSON.parse(data.value)
        : data.value;

      const payload = {
        key: data.key,
        value: parsedValue,
        timeStamp: formatToTimeStamp(data.timestamp),
        time: formatToLocalTime(data.timestamp),
      };

      return response.json(payload);
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new ErrorHandler(400, error.message);
      }

      throw new ErrorHandler(500, "Failed to Update");
    }
  } else {
    // On Create
    const newAssignment = new assignmentModel({
      key,
      value,
    });

    try {
      const data = await newAssignment.save();

      await valueService.create(data);

      const parsedValue = isJSON(data.value)
        ? JSON.parse(data.value)
        : data.value;

      const payload = {
        key: data.key,
        value: parsedValue,
        timeStamp: formatToTimeStamp(data.timestamp),
        time: formatToLocalTime(data.timestamp),
      };

      return response.status(201).json(payload);
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new ErrorHandler(400, error.message);
      }
      console.log(error);
      throw new ErrorHandler(500, "Failed to Create");
    }
  }
});

// @desc    Find key
// @route   GET /api/:mykey OR /api/:mykey?timestamp=
const findOneByKey = asyncHandler(async (request, response) => {
  const key = request.params.mykey;

  if (request.query && request.query.timestamp) {
    const isoDate = formatToISODate(request.query.timestamp);
    const assignment = await valueService.findByKeyAndTimeStamp(key, isoDate);

    if (assignment) {
      const parsedValue = isJSON(assignment.value)
        ? JSON.parse(assignment.value)
        : assignment.value;

      return response.json({ value: parsedValue });
    } else {
      throw new ErrorHandler(404, "Assignment not Found");
    }
  } else {
    const assignment = await assignmentServices.findByKey(key);

    if (assignment) {
      const parsedValue = isJSON(assignment.value)
        ? JSON.parse(assignment.value)
        : assignment.value;

      return response.json({ value: parsedValue });
    } else {
      throw new ErrorHandler(404, "Assignment not Found");
    }
  }
});

// @desc    Find All
// @route   GET /api/find-all
const findAll = asyncHandler(async (request, response) => {
  const assignment = await assignmentServices.findAll();
  return response.json(assignment);
});

export { createOrUpdate, findOneByKey, findAll };
