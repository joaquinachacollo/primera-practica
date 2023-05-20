import mongoose from "mongoose";

const cartCollection = "carrito";

const cartSchema = mongoose.Schema({
  productos: {
    type: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productos",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
