import mongoose from "mongoose";

const collection = "Productos";

const schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
});

const productModel = mongoose.model(collection, schema);
export default productModel;
