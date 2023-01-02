const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/employeeData").then(()=>{
    console.log("Database connected successfully");
  }).catch((error) => {
    console.log("Database not connected");
    console.log(error);
  });
