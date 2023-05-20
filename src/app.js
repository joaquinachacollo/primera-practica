import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const PORT = 8080;
const MONGO =
  "mongodb+srv://joaquin:achacollo@cluster0.oym82fv.mongodb.net/?retryWrites=true&w=majority";
const app = express();

const connection = mongoose.connect(MONGO);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", cartsRouter);
app.use("/api/Products", productsRouter);

app.listen(PORT, () => {
  console.log("servidor funcionando en el puerto: " + PORT);
});
