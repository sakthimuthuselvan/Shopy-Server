const express = require("express");
const app = express();
const oauthMiddleware = require("../config/oauthMiddleware");
const { getSliderData, createSlider, sliderUpdate, sliderDelete } = require("../controllers/sliderBanner");

// slider/create/banner
app.post("/create/banner", createSlider)
app.get("/get/slider/banner", getSliderData) // slider/get/slider/banner
app.put("/update/slider/banner/:id", sliderUpdate)// slider/update/slider/banner/123
app.delete("/delete/slider/banner/:id", sliderDelete)// slider/delete/banner/123




module.exports = app;
