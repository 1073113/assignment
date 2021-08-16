import ValueService from "./value.service.js";
import asyncHandler from "express-async-handler";
const valueService = new ValueService();

const findAll = asyncHandler(async (request, response) => {
  const values = await valueService.findAll();
  return response.json(values);
});

export { findAll };
