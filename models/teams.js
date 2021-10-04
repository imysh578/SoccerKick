const Sequelize = require("sequelize");

module.exports = class Teams extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                team_name: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    primaryKey: true,
                },
                // team_leaderId: {
                //   type: Sequelize.STRING(45),
                //   allowNull: false,
                // },
                team_homeGround: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                team_headCount: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                team_info: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                team_manner: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                team_area: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                modelName: "Teams",
                tableName: "teams",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        // 한판떠요 게시판
        // db.Teams.hasMany(db.Battle_board, {foreignKey: 'team_name', sourceKey: 'user_id'});

        // 회원 관리 테이블 참조
        db.Teams.belongsTo(db.User, {
            foreignKey: "team_leaderId",
            targetKey: "user_id",
        });
        db.Teams.belongsTo(db.User, {
            foreignKey: "team_area",
            targetKey: "user_area",
        });
    }
};
