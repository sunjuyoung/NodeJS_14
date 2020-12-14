/**
 * User  모델 sequelize.model 확장한 클래스
 * 
 * init메서드와 associate 메서드로 나뉜다
 * init 은 테이블에대한 설정 associate 는 다른 모델과의 관계
 */

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({ //테이블 컬럼에대한 설정, 시퀄라이즈는 id를 기본키로 자동 연결한다
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
        },{  //테이블 자체에 대한 설정
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    static associate(db){
        db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'id'});
    }
};