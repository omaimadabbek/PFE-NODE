const express = require("express");
const pool = require("./db");
const app = express.Router();
const ServerSocket = require("socket.io");

const server = require("./index");

const io = ServerSocket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", async (socket) => {
  io.emit("connection", socket.id);
  socket.once("ready for data", (data) => {
    socket.emit("Nouvelle commande", {
      message: "Naoufal",
    });
    socket.on("disconnect", () => {
      socket.disconnect();
    });
  });
});
module.exports = app;
