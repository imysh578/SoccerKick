const Sequelize = require('sequelize');

module.exports = class Mercenary_comment extends Sequelize.Model{
  static init(sequelize){
    return super.init({
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
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Mercenary_comment',
      tableName: 'mercenary_comment',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
    // 회원 관리 테이블 참조
    db.Mercenary_comment.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'user_id'});
  }
};