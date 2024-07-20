const express = require("express");
const route = express();
const { addWhishList, overallWhishList, revomeFromWhishList } = require("../controllers/wishList");

// shopy/add-to/wishlist
route.post("/add-to/wishlist", addWhishList)

// shopy/remove-to/wishlist
route.delete("/remove-to/wishlist", revomeFromWhishList)

// shopy/wishlist-list
route.post("/wishlist-list", overallWhishList)





module.exports = route;
