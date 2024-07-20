const express = require("express");
const app = express();
const oauthMiddleware = require("../config/oauthMiddleware");
const { parentCategoryAdd, getParentCategory, parentCategoryUpdate, parentCategoryDelete } = require("../controllers/categoryAdd");

// category/create/parentCategory
app.post("/create/parentCategory", parentCategoryAdd)
app.get("/get/parentCategory", getParentCategory)
app.put("/update/parentCategory/:id", parentCategoryUpdate)// category/update/parentCategory/123
app.delete("/delete/parentCategory/:id", parentCategoryDelete)// category/delete/parentCategory/123




module.exports = app;
