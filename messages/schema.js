import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    _id : { type: String, required: true, unique: true },
    senderId : { type: String, required: true },
    receiverId: { type : String, required: true },
    timestamp: { type: String, required: true },
    messageContent: { type: String, required: true , default : Date.now },
    isRead : {type : Boolean, default: false},
    attachments : [{ type: String, default:[]}]
  },
  { collection: "messages" });
export default messageSchema;