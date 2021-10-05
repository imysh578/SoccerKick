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
        modelName: "battle_comment",
        tablename: "battle_comment",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    // 회원 관리 테이블 참조
    db.Battle_comment.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  }
};
