import mongoose from "mongoose";

const { Schema } = mongoose;

const valueSchema = new Schema({
  key: {
    type: String,
    trim: true,
    index: true,
    unique: false,
    required: [true, "is a required"],
  },

  value: {
    type: String,
    required: [true, "is a required"],
  },

  timestamp: { type: Date },
});

const valueModel = mongoose.model("Values", valueSchema);

export default valueModel;
