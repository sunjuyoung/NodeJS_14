const Sequelize = require('sequelize');

//해시테그 모델을 따로 두는 것은 나중에 태크로 검색을 하기 위해서이다
module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type:Sequelize.STRING(15),
                allowNull:false,
                unique:true
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Hashtag',
            tableName:'hashtags',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associated(db){
        db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'});
    }
}