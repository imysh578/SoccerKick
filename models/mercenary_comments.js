const Sequelize = require("sequelize");

module.exports = class Mercenary_comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        mercenary_board_number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        mercenary_comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        mercenary_comment_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Mercenary_comment",
        tableName: "mercenary_comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.MercenaryComment.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    db.MercenaryComment.belongsTo(db.MercenaryBoard, {
      foreignKey: "mercenary_board_number",
      sourceKey: "mercenary_board_number",
    });
  }
};
