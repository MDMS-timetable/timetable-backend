const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        kakaoId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(50),
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        grade: {
          type: Sequelize.INTEGER,
        },
        class: {
          type: Sequelize.INTEGER,
        },
        stuNum: {
          type: Sequelize.INTEGER,
        }
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
