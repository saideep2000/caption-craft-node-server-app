import mongoose from "mongoose";
const pictureSchema = new mongoose.Schema({
    _id : { type: String, required: true, unique: true },
    postedBy: { type : String, required: true },
    description: { type: String, default : null},
    public: { type: Boolean, default:false},
    likes : {type : Number, default: 0},
    comments : [{ type: String, default:[]}],
    timestamp: { type: Date, default: Date.now }
  },
  { collection: "pictures" });
export default pictureSchema;