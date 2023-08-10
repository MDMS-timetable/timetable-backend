const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const User = require("./user");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User;

User.initiate(sequelize);

User.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
