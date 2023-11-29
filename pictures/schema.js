import mongoose from "mongoose";
const pictureSchema = new mongoose.Schema({
    _id : { type: String, required: true, unique: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    timestamp: { type: Date, default: Date.now }
  },
  { collection: "pictures" });
export default pictureSchema;