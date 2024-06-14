import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 24,
    maxLength: 300,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export default model("Project", projectSchema);
