const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Expense = sequelize.define("prods", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,

  Amount: {
    type: Sequelize.STRING,
    unique: true,
  },
  Desc: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = Expense;
