const Sequelize = require('sequelize');
//sns 로그인시 provier, snsId 저장
module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        super.init({
            email:{
                type:Sequelize.STRING(40),
                allowNull:true,
                unique:true
            },
            nick:{
                type:Sequelize.STRING(15),
                allowNull:false,
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
            provider:{
                type:Sequelize.STRING(10),
                allowNull:false,
                defaultValue:'local'
            },
            snsId:{
                type:Sequelize.STRING(30),
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }

    static associate(db){

        db.User.hasMany(db.Post);
        
        //같은 모델 다 대 다 관계
        db.User.belongsToMany(db.User,{
            foreign:'followerId',
            as:'Followings', //foreign 반대되는 모델을 가리킨다  ,   user.getFollowings
            through:'Follow' //생성할 모델이름
        })

        db.User.belongsToMany(db.User,{
            foreign:'followingId',
            as:'Followers',
            through:'Follow'
        })
    }
}