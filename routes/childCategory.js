const express = require("express");
const app = express();
const oauthMiddleware = require("../config/oauthMiddleware");
const { childCatgoryAdd, getChildCatgory,childCategoryUpdate,childCategoryDelete,parentCategoryData} = require("../controllers/childCategoryFun");

// category/create/childCategory
app.get("/get/parent/category", parentCategoryData)
app.post("/create/childCategory", childCatgoryAdd)
app.get("/get/childCategory", getChildCatgory) //category/get/childCategory
app.put("/update/childCategory/:id", childCategoryUpdate)// category/update/childCategory/123
app.delete("/delete/childCategory/:id", childCategoryDelete)// category/delete/childCategory/123




module.exports = app;
