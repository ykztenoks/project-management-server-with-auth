import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true, trim: true },
  status: {
    type: String,
    required: true,
    enum: ["not started", "ongoing", "completed"],
  },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

export default model("Task", taskSchema);
