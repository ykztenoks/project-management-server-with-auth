import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      maxLength: 36,
      required: true,
    },
    email: { type: String, unique: true, trim: true, required: true },
    password: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

export default model("User", userSchema);
