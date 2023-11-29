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
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Picture' }],
  },
  { collection: "users" });
export default userSchema;