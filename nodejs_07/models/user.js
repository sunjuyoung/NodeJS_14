const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type:Sequelize.STRING(20),
                allowNull :false,
                unique:true
            },
            age:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull :false,

            },
            married:{
                type:Sequelize.BOOLEAN,
                allowNull :false,

            },
            comment:{
                type:Sequelize.TEXT,
                allowNull :true,

            },
            create_at:{
                type:Sequelize.DATE,
                allowNull :false,
                defaultValue:Sequelize.NOW

            },
        })
    }
}