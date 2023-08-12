const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
            type: Sequelize.STRING(50),
          },
          email: {
            type: Sequelize.STRING(40),
            allowNull: true,
            unique: true,
          },
          name: {
            type: Sequelize.STRING(15),
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          snsId: {
            type: Sequelize.STRING(30),
            allowNull: true,
          },
          grade: {
            type: Sequelize.INTEGER,
          },
          class: {
            type: Sequelize.INTEGER,
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