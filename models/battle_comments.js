const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // user_id: {
        //     type: Sequelize.STRING(20),
        //     allowNull: false,
        // },
        bat_comment: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        bat_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Battle_comment",
        tableName: "battle_comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
