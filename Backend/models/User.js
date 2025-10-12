import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    mobile: { type: String, require: true },
    role: {
      type: String,
      enum: ["admin", "employee", "super admin"],
      default: "employee",
    },
    department: { type: String },
    designation: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
); //this timestamps will create 2 default field (created,updated)

const User = mongoose.model("users", userSchema);
export default User;
