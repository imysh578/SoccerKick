const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          primaryKey: true,
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_password: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_area: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_gender: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_mail: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_position: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        user_team: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_aboutMe: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        user_grade: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        salt: {
          type: Sequelize.STRING(45),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    // 구단 관리
    db.User.hasMany(db.Team, {
      foreignKey: "team_leaderId",
      sourceKey: "user_id",
    });
    db.User.hasMany(db.TeamBoard,{
      foreignKey: "team_board_writer",
      sourceKey: "user_id",
    });
  }
};
