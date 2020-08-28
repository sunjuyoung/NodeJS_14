//생성한 모델들을 시퀄라이즈에 등록

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associated(db);
Post.associated(db);
Hashtag.associated(db);

module.exports = db;
