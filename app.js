//imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const errorController = require("./controllers/error");
const Product = require("./models/product");
const tUser = require("./models/tuser");
var cors = require("cors");
const app = express();
app.use(cors());

//views

app.set("view engine", "ejs");
app.set("views", "views");

// import routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");
const prodRoutes = require("./routes/prod");
const { where } = require("sequelize");

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//middle ware
app.use((req, res, next) => {
  tUser
    .findById(1)
    .then((user) => {
      req.user = user;
      //console.log(user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(userRoutes);
app.use(prodRoutes);

//errror handler
app.use(errorController.get404);

//realtions
Product.belongsTo(tUser, { constraints: true, onDelete: "CASCADE" });
tUser.hasMany(Product);

//data base
sequelize
  .sync()
  .then((result) => {
    return tUser.findById(1);
  })
  .then((user) => {
    if (!user) {
      tUser.create({ name: "Max", email: "Max@gamail.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
