import { Schema, model } from "mongoose";

const schema = new Schema({
  firstName: { type: String, required: true, max: 100 , index:true },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  isAdmin: {type: Boolean, required: true, default:false}
});

export const UserModel = model("users", schema);