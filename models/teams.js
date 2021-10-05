const Sequelize = require("sequelize");

module.exports = class Team extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				team_name: {
					type: Sequelize.STRING(45),
					allowNull: false,
					primaryKey: true,
				},
				team_leaderId: {
					type: Sequelize.STRING(45),
					allowNull: true,
				},
				team_homeGround: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
				team_manner: {
					type: Sequelize.STRING(45),
					allowNull: true,
				},
				team_headCount: {
					type: Sequelize.INTEGER,
					allowNull: true,
				},
				team_area: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
				team_info: {
					type: Sequelize.TEXT,
					allowNull: true,
				},
				team_created_date: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW(),
				},
			},
			{
				sequelize,
				timestamps: false,
				modelName: "Team",
				tableName: "teams",
				paranoid: false,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
			}
		);
	}
	static associate(db) {
		db.Team.belongsTo(db.User, {
			foreignKey: "team_leaderId",
			targetKey: "user_id",
		});
		db.Team.hasMany(db.TeamBoard, {
			foreignKey: "team_name",
			sourceKey: "team_name",
		});
	}
};
