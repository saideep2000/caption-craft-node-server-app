import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("pictures", schema);
export default model;