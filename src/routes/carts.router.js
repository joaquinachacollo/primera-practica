import { Router } from "express";
import CartManagerMongo from "../Dao/managers/cartManagerMongo.js";

const router = Router();
const cartManagerMongo = new CartManagerMongo();

router.get("/", async (req, res) => {
  const respuesta = await cartManagerMongo.getCarts();

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const respuesta = await cartManagerMongo.getCart(cid);

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.post("/", async (req, res) => {
  const respuesta = await cartManagerMongo.createCart();
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const respuesta = await cartManagerMongo.updateCart(cid, pid);

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const respuesta = await cartManagerMongo.deleteCart(cid);

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

export default router;
