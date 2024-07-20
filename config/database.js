
const mongoose = require("mongoose");
require('dotenv').config()
const url = process.env.CONNECT_URL;


const connect=()=>{
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    console.log("database connected successfully")
  }).catch((err)=>{
    console.log("database eror")
  })
}

module.exports = connect
