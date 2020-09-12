const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    }
},{
  
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
});

const User = mongoose.model('User',userSchema);

module.exports = User;