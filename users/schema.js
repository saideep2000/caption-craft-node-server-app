import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id : { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: {
        type : String, default : "your firstname"
    },
    lastname: {
        type : String, default : "your lastname"
    },
    email: {
        type : String,
        default : "Sample@gmail.com"
    },
    dob: {
        type : Date,
        default : "01/01/2000"
    },
    profilePicture : {type : String, default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' , default : []}],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' , default : []}],
    PostedPictures : [{ type: mongoose.Schema.Types.ObjectId, ref: 'pictures' , default : []}],
  },
  { collection: "users" });
export default userSchema;