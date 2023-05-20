import { Router } from "express";
import CartManagerMongo from "../Dao/managers/cartManagerMongo.js";

const router = Router();
const cartManagerMongo = new CartManagerMongo();

router.get("/", async (req, res) => {
  const respuesta = await cartManagerMongo.getCarts();

  res.send(respuesta);
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const respuesta = await cartManagerMongo.getCart(cid);

  res.send(respuesta);
});

router.post("/", async (req, res) => {
  const respuesta = await cartManagerMongo.createCart();
  res.send(respuesta);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const respuesta = await cartManagerMongo.updateProductCart(cid, pid);

  res.send(respuesta);
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const respuesta = await cartManagerMongo.deleteCartProducts(cid);

  res.send(respuesta);
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const respuesta = await cartManagerMongo.deleteCartProduct(cid, pid);

  res.send(respuesta);
});

router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const product = req.body;

  const respuesta = await cartManagerMongo.updateCartProduct(cid, product);

  res.send(respuesta);
});

router.put("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const respuesta = await cartManagerMongo.deleteCartProducts(cid, pid);

  res.send(respuesta);
});

export default router;
