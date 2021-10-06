const Sequelize = require("sequelize");

module.exports = class Team_board extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
        post_no: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        team_name:{
          type: Sequelize.STRING(45),
          allowNull: false,
        },
				writer_name: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
				writer_id: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
				title: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
				contents: {
					type: Sequelize.TEXT,
					allowNull: true,
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				count_views: {
					type: Sequelize.INTEGER.UNSIGNED,
					allowNull: false,
          defaultValue: 0,
				},
			},
			{
				sequelize,
				timestamps: false,
				modelName: "Team_board",
				tableName: "team_boards",
				paranoid: false,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
			}
		);
	}
	static associate(db) {
		db.TeamBoard.belongsTo(db.User, {
			foreignKey: "writer_id",
			targetKey: "user_id",
		});
    db.TeamBoard.belongsTo(db.Team,{
      foreignKey: "team_name",
      targetKey: "team_name",
    })
	}
};
