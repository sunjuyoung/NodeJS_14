const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment:{
                type:Sequelize.STRING(100),
                allowNull :false,
            },
            create_at:{
                type:Sequelize.DATE,
                allowNull :true,
                defaultValue:Sequelize.NOW
                //commenter 는 관계를 따로 정의한다
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false, //스네이크 케이스
            modelName:'Comment',
            tableName:'comments',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User,{foreignKey:'commenter',targetKey:'id'});
    }
};