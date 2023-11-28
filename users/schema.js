import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id : { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: {
        type : String,
    },
    lastName: {
        type : String,
    },
    email: {
        type : String,
        default : "Sample@gmail.com"
    },
    dob: {
        type : Date,
        default : "01/01/2000"
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER" 
    },
  },
  { collection: "users" });
export default userSchema;