const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
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
          allowNull:true,
      },
      user_aboutMe: {
          type: Sequelize.STRING(45),
          allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'user',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    // 구단 관리
    db.User.hasMany(db.Teams, {foreignKey: 'team_leaderId', sourceKey: 'user_id'});
    // 구단 게시판
    // db.User.hasMany(db.Team_board, {foreignKey: 'team_board_writer', sourceKey: 'user_id'});
    // // 구단 댓글
    // db.User.hasMany(db.Team_comment, {foreignKey: 'team_comment_writer', sourceKey: 'user_id'});

    // // 용병 게시판
    // db.User.hasMany(db.Mercenary_board, {foreignKey: 'user_id', sourceKey: 'user_id'});
    // db.User.hasMany(db.Mercenary_board, {foreignKey: 'user_area', sourceKey: 'user_area'});
    // db.User.hasMany(db.Mercenary_board, {foreignKey: 'user_position', sourceKey: 'user_position'});
    // // 용병 게시판 댓글
    // db.User.hasMany(db.Mercenary_comment, {foreignKey: 'user_id', sourceKey: 'user_id'});

    // // 한판떠요 게시판
    // db.User.hasMany(db.Battle_board, {foreignKey: 'battle_board_id', sourceKey: 'user_id'});
    // // 한판떠요 게시판 댓글
    // db.User.hasMany(db.Battle_comment, {foreignKey: 'user_id', sourceKey: 'user_id'});
  }
};