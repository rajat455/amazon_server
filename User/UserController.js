const userModel = require("./UserModel")
const validation = require("./Validation")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")

class UserController {
    async RegiseterUser(req, res) {
        try {
            const {email, password} = req.body
            const ValidationResult = validation(req.body, "register")
            if(ValidationResult.length > 0){
                return res.status(400).send({message:"Validation Error", errors:ValidationResult})
            }
            const PasswordEncode = bcrypt.hashSync(password, 8)
            if(!PasswordEncode){
                return res.status(500).send({message:"Somthing went wrong"})
            }
            const createUser = await userModel.create({...req.body, password:PasswordEncode})
            if(!createUser){
                return res.status(500).send({message:"Somthing went wrong"})
            }
            const user = createUser._doc
            delete user.password
            const token = jwt.sign({...user},process.env.JWT_SECRATE, {expiresIn:"30d"})
            if(!token){
                return res.status(500).send({message:"Somthing went wrong"})
            }
            return res.status(200).send({message:"Success", user:{...user,token:token}})
        } catch (error) {
            if(error && error.message && error.message.includes("E11000")){
                return res.status(400).send({message:"Auth Error", errors:[{key:"email", message:"Email is Allready Exist"}]})
            }
            return res.status(500).send({message:"Internal server error"})
        }
    }

    async LoginUser(req,res){
        try {
            const {email, password} = req.body
            const ValidationResult = validation(req.body, "login")
            if(ValidationResult.length > 0){
                return res.status(400).send({message:"Validation Error",errors:ValidationResult})
            }
            const findByEmail = await userModel.findOne({email:email})
            if(!findByEmail){
                return res.status(400).send({message:"Auth Error", errors:[{key:"email", message:"Email not exist"}]})
            }
            const user = findByEmail._doc
            if(!(bcrypt.compareSync(password, user.password))){
                return res.status(400).send({message:"Auth Error", errors:[{key:"password", message:"Incorrect email or passwrod"}]})
            }
            delete user.password
            const token = jwt.sign(user, process.env.JWT_SECRATE, {expiresIn:"30d"})
            if(token){
                return res.status(200).send({message:"Success", user:{...user, token:token}})
            }
            return res.status(500).send({message:"Somthing went wrong"})
        } catch (error) {
            return res.status(500).send({message:"Internal server error"})
        }
    }
}

const userConroller = new UserController()
module.exports = userConroller