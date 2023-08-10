const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(50),
        },
        password: {
          type: Sequelize.STRING(255),
        },
        grade: {
          type: Sequelize.INTEGER,
        },
        class: {
          type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING(50),
          },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "User",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = User;