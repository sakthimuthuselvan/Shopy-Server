const express = require("express");
const route = express();
const { addTOCart, revomeFromCart,cartList} = require("../controllers/cartProduct");

// shopy/add-to/cart
route.post("/add-to/cart",addTOCart)

// shopy/remove-to/cart
route.delete("/remove-to/cart",revomeFromCart)

// shopy/cart-list
route.post("/cart-list",cartList)





module.exports = route;
