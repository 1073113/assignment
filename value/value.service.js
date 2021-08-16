import valueModel from "./value.model.js";

export default class ValueService {
  constructor() {}

  async findByKey(mykey) {
    const response = await valueModel.findOne({ key: mykey });
    return response;
  }

  async findByKeyAndTimeStamp(key, isoDate) {
    const response = await valueModel
      .findOne({
        key,
        timestamp: { $lte: isoDate },
      })
      .sort({ _id: -1 });

    return response;
  }

  async findAll() {
    const response = await valueModel.find({});
    return response;
  }

  async create(assignement) {
    const payload = {
      key: assignement.key,
      value: assignement.value,
      timestamp: assignement.timestamp,
    };

    const newValue = new valueModel(payload);
    return await newValue.save();
  }
}
