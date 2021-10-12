const Sequelize = require("sequelize");

module.exports = class WannaJoin extends Sequelize.Model {
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
				team_leaderId: {
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
				modelName: "WannaJoin",
				tableName: "wannaJoins",
				paranoid: false,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
			}
		);
	}
	static associate(db) {
		db.WannaJoin.belongsTo(db.User, {
			foreignKey: "user_id",
			targetKey: "user_id",
		});
		db.WannaJoin.belongsTo(db.Team, {
			foreignKey: "team_leaderId",
			targetKey: "team_leaderId",
		});
		db.WannaJoin.belongsTo(db.Team, {
			foreignKey: "team_name",
			targetKey: "team_name",
		});
	}
};
