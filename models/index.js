require("dotenv").config();
const Sequelize = require("sequelize");
const User = require("./users");
const Team = require("./teams");
const TeamComment = require("./team_comments");
const TeamBoard = require("./team_boards");
const MercenaryBoard = require("./mercenary_boards");
const MercenaryComment = require("./mercenary_comments");
const BattleComment = require("./battle_comments");
const BattleBoard = require("./battle_boards");
const WannaJoin = require("./wanna_joins");
const UsersInTeam = require("./usersInTeam");

const env = process.env.NODE_ENV || "development";

// MYSQL Connecttion 설정 불러오기
const config = require("../config/config")[env];
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

// db객체에 모든 테이블 넣기
const db = {};
db.sequelize = sequelize;
db.User = User;
db.Team = Team;
db.TeamComment = TeamComment;
db.TeamBoard = TeamBoard;
db.MercenaryBoard = MercenaryBoard;
db.MercenaryComment = MercenaryComment;
db.BattleComment = BattleComment;
db.BattleBoard = BattleBoard;
db.WannaJoin = WannaJoin;
db.UsersInTeam = UsersInTeam;

// MySQL이랑 연동 시작
User.init(sequelize);
Team.init(sequelize);
TeamComment.init(sequelize);
TeamBoard.init(sequelize);
MercenaryBoard.init(sequelize);
MercenaryComment.init(sequelize);
BattleBoard.init(sequelize);
BattleComment.init(sequelize);
WannaJoin.init(sequelize);
UsersInTeam.init(sequelize);

// 관계형으로 만들때
User.associate(db);
Team.associate(db);
TeamComment.associate(db);
TeamBoard.associate(db);
MercenaryBoard.associate(db);
MercenaryComment.associate(db);
// BattleComment.associate(db);
BattleBoard.associate(db);
WannaJoin.associate(db);
UsersInTeam.associate(db);

module.exports = db;
