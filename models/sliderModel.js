const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({

    sm_img: {
        type: String,
        required: true,
    },
    lg_img: {
        type: String,
        required: true
    },
    navigate_path: {
        type: String,
        required: true
    },
},{collection:"slider"});


const SliderModel = mongoose.model("slider", SliderSchema)

module.exports = { SliderModel };