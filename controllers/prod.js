const express = require("express");
const app = express();
const Expense = require("../models/prod");
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

exports.addProd =
  ("/user/add-prod",
  async (req, res, next) => {
    try {
      console.log(req.body);
      const name = req.body.name;
      const Amount = req.body.Amount;
      const Desc = req.body.Desc;
      const data = await Expense.create({
        name: name,
        Amount: Amount,
        Desc: Desc,
      });
      console.log("user created!");
      res.status(201).json({ newData: data });
    } catch (err) {
      console.log(err);
    }
  });
exports.getProds =
  ("/user/get-prod",
  async (req, res, next) => {
    const newData = await Expense.findAll();
    res.status(201).json({ newData });
  });

exports.updateProds =
  ("/user/edit-prod",
  (req, res, next) => {
    console.log(req.body);
    const prodid = req.body.id;
    const name = req.body.name;
    const Amount = req.body.Amount;
    const Desc = req.body.Desc;
    Expense.findOne({ where: { id: prodid } })
      .then((prods) => {
        prods.name = name;
        prods.Amount = Amount;
        prods.Desc = Desc;
        return prods.save();
      })
      .then((result) => {
        console.log("product updated!");
      })
      .catch((err) => console.log(err));
  });

exports.deleteProds =
  ("/user/delete-prod",
  (req, res, next) => {
    const prodid = req.body.id;
    Expense.destroy({ where: { id: prodid } })
      .then((res) => {
        console.log("deleted!");
      })
      .catch((err) => console.log(err));
  });
