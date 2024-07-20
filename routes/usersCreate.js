const express = require("express");
const route = express();
const {createUser,loginUser,forgotOtpSend,forGotOptSubmit,resetPassword} = require("../controllers/userRegister");

// shopy/create/user
route.post("/create/user",createUser)

// shopy/user/login
route.post("/user/login",loginUser)

//shopy/forgot/opt-send
route.post("/forgot/opt-send",forgotOtpSend)

//shopy/forgot/opt-submit
route.post("/forgot/opt-submit",forGotOptSubmit)

//shopy/reset/password
route.post("/reset/password",resetPassword)




module.exports = route;
