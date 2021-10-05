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
        tableName: "battle_board",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    // 회원 관리 테이블 참조
    db.Battle_board.belongsTo(db.User, {
      foreignKey: "team_leaderId",
      targetKey: "user_id",
    });
    // 구단 테이블 참조
    db.Battle_board.belongsTo(db.teams, {
      foreignKey: "team_name",
      targetKey: "battle_board_teamName",
    });
    db.Battle_board.belongsTo(db.teams, {
      foreignKey: "team_area",
      targetKey: "battle_board_area",
    });
  }
};
