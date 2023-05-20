import cartModel from "../models/carts.js";
import productModel from "../models/products.js";

class CartManagerMongo {
  async createCart() {
    const cart = await cartModel.create({});

    return cart;
  }

  async updateProductCart(cartId, prodId) {
    const producto = await productModel.findById(prodId);
    const carrito = await cartModel.findById(cartId);

    if (!producto || !carrito) {
      console.log("Error");
    }

    const existeProductoIndex = carrito.productos.findIndex(
      (productItem) => productItem.producto.toString() === prodId
    );

    if (existeProductoIndex !== -1) {
      carrito.productos[existeProductoIndex].quantity += 1;
    } else {
      carrito.productos.push({ producto: producto._id, quantity: 1 });
    }

    await carrito.save();

    const result = await cartModel
      .find({ _id: carrito._id })
      .populate("productos.producto");

    return JSON.stringify(result, null, "\t");
  }

  async getCarts() {
    const carts = await cartModel.find();

    return carts;
  }

  async getCart(cid) {
    const cart = await cartModel.findOne({ _id: cid });

    if (!cart) {
      return "No se ha encontrado un cart con ese ID";
    }

    return cart;
  }

  async deleteCartProducts(cid) {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return "No se ha encontrado un cart con ese ID";
    }

    cart.productos = [];
    await cart.save();

    return cart;
  }

  async deleteCartProduct(cid, pid) {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return "No se ha encontrado un carrito con ese ID";
    }

    const product = cart.productos.find(
      (product) => product.producto.toString() == pid
    );

    if (!product) {
      return "producto no encontrado en el carrito";
    }

    if (product.quantity === 1) {
      cart.productos = cart.productos.filter(
        (product) => product.producto.toString() !== pid
      );
    } else {
      product.quantity--;
    }
    await cart.save();

    return product;
  }

  async updateCartProduct(cid, products) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return "carrito no encontrado";
    }

    cart.productos = products;
    await cart.save();

    return cart;
  }

  async updateCartQuantity(cid, pid, qty) {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      return "carrito no encontrado";
    }

    const productIndex = cart.productos.findIndex(
      (product) => product.producto.toString() == pid
    );

    if (!productIndex === -1) {
      return "producto no encontrado";
    }

    cart.productos[productIndex].quantity = qty;
    await cart.save();

    return cart;
  }
}

export default CartManagerMongo;
