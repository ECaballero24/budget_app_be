const express = require("express");

const transactionRoutes = express.Router();
const transactionsArray = require("../models/data.js");

//ALL
transactionRoutes.get("/", (req, res) => {
  res.json(transactionsArray);
});

//INDIVIDUAL VIEW
transactionRoutes.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    res.json(transactionsArray[index]);
  } else {
    res
      .status(404)
      .json({ error: "Transaction not found, you might have no money!" });
  }
});

//CREATE
transactionRoutes.post("/", (req, res) => {
  console.log(req.body);
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1]);
});

module.exports = transactionRoutes;
