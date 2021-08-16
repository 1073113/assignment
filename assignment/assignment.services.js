import assignmentModel from "./assignment.model.js";

export default class AssignmentService {
  constructor() {}

  async findByKey(mykey) {
    const response = await assignmentModel.findOne({ key: mykey });
    return response;
  }

  async findAll() {
    return await assignmentModel.find({});
  }
}
