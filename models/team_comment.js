const Sequelize = require('sequelize');

module.exports = class Team_comment extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      team_comment_writer: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      team_comment_title: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      team_comment_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Team_comment',
      tableName: 'team_comment',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
  }
};