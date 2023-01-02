require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');

// middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// database connection setup
const register = require('./models/schema');
require('./db/database'); 


// console.log(process.env.SECRET)

app.post("/", async(req,res)=>{
    try{
        const data = new register({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        const token = data.generateAuthToken();
        console.log("token is : " + token)
        const saveData = await data.save(); 
        console.log("save");
    }catch(error){
        console.log("data is not save", error);
    }
});
app.get("/", async(req,res)=>{
  try{
    const email = req.body.email
    const password = req.body.password
    
    const userData = await register.findOne({email:email})
    const passwordMatch = bcrypt.compare(password, userData.password)

    if(passwordMatch){
     console.log(userData.name)
    }
  }catch(error){
    console.log("Invalid Cardintial: ", error);
  }
});

app.get("/login", (req,res)=>{
  res.send("i am login page: ")
});

app.listen(port, (req, res)=>{
    console.log(`i am listening port number ${port}`)
});