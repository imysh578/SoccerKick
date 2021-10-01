const Sequelize = require('sequelize');
const User = require('./user');
const Teams = require('./teams');
const TeamsComment = require('./team_comment');
const TeamBoard = require('./team_board');
const MercenaryBoard = require('./mercenary_board');
const MercenaryComment = require('./mercenary_comment');
const BattleComment = require('./battle_comment');
const BattleBoard = require('./battle_board');

const env = process.env.NODE_ENV || 'development';
// config.json 파일 불러옴
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// config.json파일에 있는 MySQL connection 정보 불러옴
const sequelize = new Sequelize(config.database, config.username, config.password, config);
console.log(sequelize);
// db객체에 모든 테이블 넣기
db.sequelize = sequelize;
db.User = User;
db.Teams = Teams;
db.TeamsComment = TeamsComment;
db.TeamBoard = TeamBoard;
db.MercenaryBoard = MercenaryBoard;
db.MercenaryComment = MercenaryComment;
db.BattleComment = BattleComment;
db.BattleBoard = BattleBoard;

// MySQL이랑 연동 시작
User.init(sequelize);
Teams.init(sequelize);
TeamsComment.init(sequelize);
TeamBoard.init(sequelize);
MercenaryBoard.init(sequelize);
MercenaryComment.init(sequelize);
BattleBoard.init(sequelize);
BattleComment.init(sequelize);

// 다른 테이블과의 관계 설정
User.associate(db);
Teams.associate(db);
// TeamsComment.associate(db);
// TeamBoard.associate(db);
// MercenaryBoard.associate(db);
// MercenaryComment.associate(db);
// BattleComment.associate(db);
// BattleBoard.associate(db);


module.exports = db;
