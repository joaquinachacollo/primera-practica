import { Router } from "express";
import ProductManagerMongo from "../Dao/managers/productManagerMongo.js";
import productModel from "../Dao/models/products.js";

const router = Router();
const productManagerMongo = new ProductManagerMongo();

router.get("/", async (req, res) => {
  const result = await productManagerMongo.getProducts();

  res.send(result);
});

router.get("/", async (req, res) => {
  const { limit, page, sort, qry } = req.query;

  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
    await productModel.paginate(
      { category: qry },
      { limit: limit, page: page, sort: { price: sort }, lean: true }
    );
  const products = docs;

  res.render("products", {
    products,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    limit,
    sort,
    qry,
  });
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;

  const result = await productManagerMongo.getProductByID(pid);

  res.send(result);
});

router.post("/", async (req, res) => {
  const product = req.body;

  const result = await productManagerMongo.addProduct(product);

  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  const result = await productManagerMongo.updateProduct(id, product);

  res.status(result);
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  const result = await productManagerMongo.deleteProduct(id);
  res.send(result);
});

export default router;
