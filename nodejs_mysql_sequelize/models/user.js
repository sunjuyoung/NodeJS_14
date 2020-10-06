const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true
            },
            age:{
                type:Sequelize.INTEGER.UNSIGNED, //부호설정
                allowNull:false,

            },
            married:{
                type:Sequelize.BOOLEAN,
                allowNull:false,

            },
            comment:{
                type:Sequelize.TEXT,
                allowNull:true,

            },
            create_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW

            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }

    static associate(db){

        db.User.hasMany(db.Comment,{foreign:'commenter',sourceKey:'id'});
    }
}