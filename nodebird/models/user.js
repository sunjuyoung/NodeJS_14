const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
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
                type:Sequelize.STRING(50),
                allowNull:true,
                
            },
            provider:{
                type:Sequelize.STRING(10),
                allowNull:false,
                defaultValue:'local' //sns로그인시 kakao
                
            },
            snsId:{
                type:Sequelize.STRING(30),
                allowNull:true,
                
            }
        },{//timestamps , paranoid ture로 주어져 createAt,updateAt,deleteAt 컬럼도 생성된다
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associated(db){
        db.User.hasMany(db.Post);

        //as는 foreignkey와 반대되는 모델을 가리키다
        //db.sequelize.models.Follow 자동생성
        db.User.belongsToMany(db.User,{
            foreignKey:'followingId',
            as:'Followers',
            through:'Follow'
        })
        db.User.belongsToMany(db.User,{
            foreignKey:'followerId',
            as:'followings',
            through:'Follow'
        })
    }
}