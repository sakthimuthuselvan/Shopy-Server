const mongoose = require('mongoose');

const Ads = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
},{collection:"imageCards"});

const ImageCards = mongoose.model("imageCards", Ads)

module.exports = { ImageCards };