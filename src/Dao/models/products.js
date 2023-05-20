import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "productos";

const schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
});

schema.plugin(mongoosePaginate);

const productModel = mongoose.model(collection, schema);
export default productModel;
