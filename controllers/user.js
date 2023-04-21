const express = require("express");
const app = express();
const User = require("../models/User");
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

exports.addUser =
  ("/user/add-user",
  async (req, res, next) => {
    try {
      const name = req.body.name;
      const number = req.body.number;
      const email = req.body.email;
      const data = await User.create({
        name: name,
        number: number,
        email: email,
      });
      console.log("user created!");
      res.status(201).json({ newData: data });
    } catch (err) {
      console.log(err);
    }
  });
exports.getUsers =
  ("/user/get-user",
  async (req, res, next) => {
    const newData = await User.findAll();
    res.status(201).json({ newData });
  });

exports.updateUser =
  ("/user/edit-user",
  (req, res, next) => {
    console.log(req.body);
    const prodid = req.body.id;
    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;
    User.findOne({ where: { id: prodid } })
      .then((users) => {
        users.name = name;
        users.number = number;
        users.email = email;
        return users.save();
      })
      .then((result) => {
        console.log("product updated!");
      })
      .catch((err) => console.log(err));
  });

exports.deleteUser =
  ("/user/delete-user",
  (req, res, next) => {
    const prodid = req.body.id;
    User.destroy({ where: { id: prodid } })
      .then((res) => {
        console.log("deleted!");
      })
      .catch((err) => console.log(err));
  });
