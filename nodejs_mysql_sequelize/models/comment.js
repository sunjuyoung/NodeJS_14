const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
           
            create_at:{
                type:Sequelize.DATE,
                allowNull:true,
                defaultValue:Sequelize.NOW

            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Comment',
            tableName:'comments',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }

    static associate(db){
        
        db.Comment.belongsTo(db.User,{foreign:'commenter',targetKey:'id'});
    }
}