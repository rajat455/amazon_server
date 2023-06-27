const { default: mongoose } = require("mongoose");

class UserModel {
    constructor(){
        this.schema = mongoose.Schema({
            firstName:{type:String, length: 20 ,require:true},
            lastName:{type:String,length:20, require:true},
            phone:{type:String, length:10, default:null},
            isAdmin:{type:Boolean, default:false},
            email:{type:String,length:50, require:true, unique:true},
            password:{type:String,require:true}
        }, {
            
            timestamps:true
        })
    }
}

const User = new UserModel()
const userModel = mongoose.model("tbl_users",User.schema )

module.exports = userModel