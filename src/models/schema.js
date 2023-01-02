require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

// Token generate
employeeSchema.methods.generateAuthToken = async function(){
   try{
    const token  =  jwt.sign({_id:this._id}, process.env.SECRET)
    this.tokens = this.tokens.concat({token})
    // await this.save()
    return token

   }catch(error){
    console.log("token not generate");
   }
}
// Hashing 
employeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const register = new mongoose.model("Register", employeeSchema);
module.exports = register;