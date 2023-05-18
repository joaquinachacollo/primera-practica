import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";

import { Server } from "socket.io";
import messageModel from "./Dao/models/messages.js";

const PORT = 8080;
const MONGO =
  "mongodb+srv://joaquin:achacollo@cluster0.dtnsvfb.mongodb.net/?retryWrites=true&w=majority";
const app = express();

const connection = mongoose.connect(MONGO);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", cartsRouter);
app.use("/", productsRouter);

const server = app.listen(PORT, () => {
  console.log("servidor funcionando en el puerto: " + PORT);
});

const io = new Server(server);
let message = [];
io.on("connection", (socket) => {
  console.log("usuario connected");

  socket.on("message", async (data) => {
    message.push(data);
    await messageModel.create(message);
    io.emit("messageLogs", message);
  });

  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnnected", data);
  });
});
