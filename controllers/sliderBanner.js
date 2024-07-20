const fs = require("fs")
const { SliderModel } = require("../models/sliderModel");


const getSliderData = async (req, res) => {
    try {
        const allProducts = await SliderModel.find();
        console.log('All Products:', allProducts);
        return res.status(200).json({ response: "success", response_data: allProducts });
    } catch (error) {
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
}

const createSlider = async (req, res) => {
    const { sm_img, lg_img, navigate_path } = req.body;
    try {
        if (!sm_img) {
            return res.status(400).json({ response: "failure", response_message: "Invaild small size screen image" });
        } else if (!lg_img) {
            return res.status(400).json({ response: "failure", response_message: "Invaild large size screen image" });
        } else if (!navigate_path) {
            return res.status(400).json({ response: "failure", response_message: "Invalid child navigate path" });

        }

        SliderModel.create({
            sm_img, lg_img, navigate_path
        });

        return res.status(200).json({ response: "success", response_message: "Slider added successfully" });
    } catch (error) {
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
}

const sliderUpdate = async (req, res) => {
    const { id } = req.params;
    const { sm_img, lg_img, navigate_path } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ response: "failure", response_message: "Invalid Id" });
        } else if (!sm_img) {
            return res.status(400).json({ response: "failure", response_message: "Invaild small size screen image" });
        } else if (!lg_img) {
            return res.status(400).json({ response: "failure", response_message: "Invaild large size screen image" });
        } else if (!navigate_path) {
            return res.status(400).json({ response: "failure", response_message: "Invalid child navigate path" });

        }
        await SliderModel.findByIdAndUpdate(id, { sm_img, lg_img, navigate_path })
        return res.status(200).json({ response: "success", response_message: "Slider updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
};

const sliderDelete = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the parent category by ID and delete it
        const deletedParentCategory = await SliderModel.findByIdAndDelete(id);
        console.log("sa ", deletedParentCategory);
        // Check if the parent category exists
        if (!deletedParentCategory) {
            return res.status(404).json({ response: "failure", response_message: "Slider not found" });
        }
        // fs.unlinkSync(deletedParentCategory.sm_img);
        // fs.unlinkSync(deletedParentCategory.lg_img);

        return res.status(200).json({ response: "success", response_message: "Slider deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
};


module.exports = { getSliderData, createSlider, sliderUpdate, sliderDelete }