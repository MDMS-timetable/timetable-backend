const Sequelize = require("sequelize");

class Hits_Lunch extends Sequelize.Model {
  static initiate(sequelize) {
    Hits_Lunch.init(
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
        modelName: "Hits_Lunch",
        tableName: "Hits_Lunch",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = Hits_Lunch;