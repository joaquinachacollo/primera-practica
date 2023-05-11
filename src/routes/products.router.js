import { Router } from "express";
import ProductManagerMongo from "../Dao/managers/productManagerMongo.js";

const router = Router();
const productManagerMongo = new ProductManagerMongo();

router.get("/", async (req, res) => {
  const result = await productManagerMongo.getProducts();

  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;

  const result = await productManagerMongo.getProductByID(pid);

  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
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

  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  const result = await productManagerMongo.deleteProduct(id);
  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

export default router;
