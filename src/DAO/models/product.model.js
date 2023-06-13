import { Schema, model } from "mongoose";

const schema = new Schema({
  title: { type: String, required: true, max: 100 , unique:true},
  description: { type: String, required: true, max: 100 , unique:true},
  price: { type: Number, required: true, min:0, unique:true},
  code:{type: String,unique:true},
  stock:{type: Number, min:1, },
  status:{type: Boolean, default:true},
  category:{type: String, },
  thumbnails:{type: String, }
});

export const productModel = model("product", schema);