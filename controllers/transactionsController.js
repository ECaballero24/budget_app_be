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
      .json({ error: "Transaction not found, you might be broke!" });
  }
});

//CREATE
transactionRoutes.post("/", (req, res) => {
  console.log(req.body);
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1]);
});

//DELETE
transactionRoutes.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    let removed = transactionsArray.splice(index, 1);
    res.json(removed[0]);
  } else {
    res.status(404).json({ error: "Nope, not found!" });
  }
});

//UPDATE
transactionRoutes.put("/:index", (req, res) => {
  const { index } = req.params;
  if (!transactionsArray[index]) {
    res.status(422).json({
      error: "not found",
    });
    return;
  }

  let { date, name, amount, from } = req.body;
  if (date && name && amount !== undefined && from) {
    transactionsArray[index] = {
      date,
      name,
      amount,
      from,
    };
    res.json(transactionsArray[index]);
  } else {
    res.status(422).json({
      error: "Please provide all fields",
    });
  }
});

module.exports = transactionRoutes;
