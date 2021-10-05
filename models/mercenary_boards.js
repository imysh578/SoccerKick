const Sequelize = require("sequelize");

module.exports = class Mercenary_board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_area: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_position: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        mercenary_board_title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        mercenary_board_content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        mercenary_board_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Mercenary_board",
        tableName: "mercenary_boards",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
