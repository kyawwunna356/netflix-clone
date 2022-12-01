const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {type: String,required: true,unique: true},
    email : {type: String,required: true,unique: true},
    password: {type: String,required: true},
    profile: {type: String,default: ''},
    isAdmin: {type: Boolean,default: false,},
 
},{timestamps: true,})

module.exports = mongoose.model('User',userSchema)

