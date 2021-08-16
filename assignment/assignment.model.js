import mongoose from "mongoose";

const { Schema } = mongoose;

const assignementSchema = new Schema({
  key: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: [true, "is required"],
  },

  value: {
    type: String,
    required: [true, "is required"],
  },

  timestamp: { type: Date },
});

assignementSchema.pre("save", function (next) {
  const d = new Date();
  d.setMilliseconds(0);
  this.timestamp = d;
  return next();
});

const assignmentModel = mongoose.model("Assignment", assignementSchema);

export default assignmentModel;
