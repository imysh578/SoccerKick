const Sequelize = require("sequelize");

module.exports = class UsersInTeam extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					primaryKey: true,
					autoIncrement: true,
				},
				team_name: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
				user_id: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: false,
				modelName: "UsersInTeam",
				tableName: "usersInTeams",
				paranoid: false,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
			}
		);
	}
	static associate(db) {
		db.UsersInTeam.belongsTo(db.User, {
			foreignKey: "user_id",
			targetKey: "user_id",
		});
		db.UsersInTeam.belongsTo(db.Team, {
			foreignKey: "team_name",
			targetKey: "team_name",
		});
	}
};
