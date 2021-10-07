const Sequelize = require("sequelize");

module.exports = class Team_comment extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				comment_no: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				post_num: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				writer_id: {
					type: Sequelize.STRING(45),
					allowNull: false,
				},
				comment: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			{
				sequelize,
				timestamps: false,
				modelName: "Team_comment",
				tableName: "team_comments",
				paranoid: false,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci",
			}
		);
	}
	static associate(db) {
		db.TeamComment.belongsTo(db.User, {
			foreignKey: "writer_id",
			targetKey: "user_id",
		});
		db.TeamComment.belongsTo(db.TeamBoard, {
			foreignKey: "post_num",
			targetKey: "post_num",
		});
	}
};
