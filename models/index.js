const Sequelize = require("sequelize");
const User = require("./users");
const Team = require("./teams");
const TeamComment = require("./team_comments");
const TeamBoard = require("./team_boards");
const MercenaryBoard = require("./mercenary_boards");
const MercenaryComment = require("./mercenary_comments");
const BattleComment = require("./battle_comments");
const BattleBoard = require("./battle_boards");

const env = process.env.NODE_ENV || "development";
// config.json 파일 불러옴
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// config.json파일에 있는 MySQL connection 정보 불러옴
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
// db객체에 모든 테이블 넣기
db.sequelize = sequelize;
db.User = User;
db.Team = Team;
db.TeamComment = TeamComment;
db.TeamBoard = TeamBoard;
db.MercenaryBoard = MercenaryBoard;
db.MercenaryComment = MercenaryComment;
db.BattleComment = BattleComment;
db.BattleBoard = BattleBoard;

// MySQL이랑 연동 시작
User.init(sequelize);
Team.init(sequelize);
TeamComment.init(sequelize);
TeamBoard.init(sequelize);
MercenaryBoard.init(sequelize);
MercenaryComment.init(sequelize);
BattleBoard.init(sequelize);
BattleComment.init(sequelize);

// 관계형으로 만들때
User.associate(db);
Team.associate(db);
TeamComment.associate(db);
TeamBoard.associate(db);
// MercenaryBoard.associate(db);
// MercenaryComment.associate(db);
// BattleComment.associate(db);
// BattleBoard.associate(db);

module.exports = db;
