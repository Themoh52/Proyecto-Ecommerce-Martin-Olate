import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  products: {type:[{product:{type:SchemaTypes.ObjectId, ref:"product",require:true}}]},
  quantity: { type: Number, required: true, min: 1 , default:1}
});

export const cartModel = model("cart", schema);