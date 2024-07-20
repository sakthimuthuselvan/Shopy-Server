const express = require("express");
const app = express();
const oauthMiddleware = require("../config/oauthMiddleware");
const { imageAddsGet, AddimageAds, AddimageAdsUpdate, AddimageAdsDelete } = require("../controllers/ads");


app.get("/get/image/ads", imageAddsGet)  // addvertisment/get/image/ads
app.post("/create/image/ads", AddimageAds)  // addvertisment/create/image/ads
app.put("/update/image/ads/:id", AddimageAdsUpdate)// addvertisment/update/image/ads/123
app.delete("/delete/image/ads/:id", AddimageAdsDelete)// addvertisment/delete/childCategory/123


module.exports = app;
