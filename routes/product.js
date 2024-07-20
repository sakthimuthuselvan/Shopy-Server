const express = require("express");
const app = express();
const oauthMiddleware = require("../config/oauthMiddleware");
const { productAdd, productUpdate,getAllProducts, producDelete } = require("../controllers/productFile");


app.post("/create/product", productAdd) // product/create/product
app.get("/get/product", getAllProducts) // product/get/product
app.put("/update/product/:id", productUpdate)// product/update/product/123
app.delete("/delete/product/:id", producDelete)// product/delete/product/123




module.exports = app;
