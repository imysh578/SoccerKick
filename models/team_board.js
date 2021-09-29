const Sequelize = require('sequelize');

module.exports = class Team_board extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      // team_board_writer: {
      //   type: Sequelize.STRING(45),
      //   allowNull: false,
      // },
      team_board_title: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      team_board_contents: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      team_board_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      team_board_views: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Team_board',
      tableName: 'team_board',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    // 회원 관리 테이블 참조
    db.Team_board.belongsTo(db.User, {foreignKey: 'team_board_writer', targetKey: 'user_id'});
  }
};