const express = require("express");
const app = express();
const transactionsController = require("./controllers/transactionsController.js");
const cors = require("cors");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO THE TRANSACTION APP");
});

app.use("/transactions", transactionsController);

//CATCH-ALL
app.get("*", (req, res) => {
  res.status(404).json({ error: "nope, not found" });
});

module.exports = app;
