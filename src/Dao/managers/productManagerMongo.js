import productModel from "../models/products.js";

class ProductManagerMongo {
  async addProduct(_product) {
    const product = {
      title: _product.title,
      description: _product.description,
      price: _product.price,
      stock: _product.stock,
      category: _product.category,
    };

    try {
      await productModel.create(product);
      return {
        code: 202,
        status: "Success",
        message: `El producto ${product.title} ha sido agregado con éxito.`,
      };
    } catch (error) {
      return {
        code: 400,
        status: "Error",
        message: `${error}`,
      };
    }
  }

  async getProducts() {
    const products = await productModel.find();

    return products;
  }

  async getProductByID(pid) {
    const product = await productModel.findOne({ _id: pid });

    if (!product) {
      return "No se ha encontrado un product con ese ID";
    }

    return product;
  }

  async updateProduct(pid, _product) {
    const products = await productModel.findOne({ _id: pid });

    products.title = _product.title;
    products.description = _product.description;
    products.price = _product.price;
    products.stock = _product.stock;
    products.category = _product.category;

    await productModel.updateMany({ _id: pid }, { $set: products });

    return `El producto con ID ${pid} ha sido actualizado exitosamente`;
  }

  async deleteProduct(pid) {
    const product = await productModel.deleteOne({ _id: pid });

    if (!product) {
      return "No se ha encontrado un product con ese ID";
    }

    return product;
  }
}

export default ProductManagerMongo;
