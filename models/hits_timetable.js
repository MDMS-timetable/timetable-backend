const Sequelize = require("sequelize");

class Hits_Timetable extends Sequelize.Model {
  static initiate(sequelize) {
    Hits_Timetable.init(
      {
        hits: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Hits_Timetable",
        tableName: "Hits_Timetable",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = Hits_Timetable;
