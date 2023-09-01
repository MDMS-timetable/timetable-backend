const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const Hits_Timetable = require("./hits_timetable");
const Hits_Lunch = require("./hits_lunch");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = Hits_Timetable;
db.User = Hits_Lunch;

Hits_Timetable.initiate(sequelize);
Hits_Lunch.initiate(sequelize);

Hits_Timetable.associate(db);
Hits_Lunch.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
