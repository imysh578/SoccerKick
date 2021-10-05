const Sequelize = require("sequelize");

module.exports = class Battle_board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        battle_board_teamName: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        battle_board_area: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        // battle_board_id: {
        //   type: Sequelize.STRING(45),
        //   allowNull: false,
        // },
        battle_board_personnel: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        battle_board_title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        battle_board_content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        battle_board_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Battle_board",
        tableName: "battle_boards",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
