const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const User = require('./user');
const Comment = require('./comment');

/* config.json에서 데이터베이스 설정을 불러온 후 new sequelize를 통해 mysql연결 객체 생성
나중에 재사용하기위해 db.sequelize에 넣어둔다 */

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;

User.init(sequelize); //staic.init 메서드 호출, init이 실행되어야 테이블이 모델로 연결
Comment.init(sequelize);

User.associate(db); //다른 테이블과의 관계를 연결하는 associate메스드도 미리 실행
Comment.associate(db);

module.exports = db;
