const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        super.init({

            content:{
                type:Sequelize.STRING(140),
                allowNull:false,
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true,
                unique:true
            },
        },{

            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Post',
            tableName:'posts',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }

    static associate(db){
        db.Post.belongsTo(db.User);

        //자동으로 생성된 모델 접근 db.sequelize.models.PostHashtag
        db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'});
    }
}