import { Router } from "express";
import messageModel from "../Dao/models/messages.js";

const router = Router();

router.get("/message", async (req, res) => {
  const result = await messageModel.find();
  res.send(result);
});

router.get("/", (req, res) => {
  res.render("chat", {});
});

router.delete("/message/:uid", async (req, res) => {
  const id = req.params.uid;

  const result = await messageModel.deleteOne({ _id: id });
  res.send({ result });
});

export default router;
