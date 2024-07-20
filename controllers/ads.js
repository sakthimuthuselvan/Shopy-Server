const { ImageCards } = require("../models/adsModel");
const fs = require("fs")

const imageAddsGet = async (req, res) => {
    console.log(req.body);
    try {
      const allProducts = await ImageCards.find();

        return res.status(200).json({ response: "success", response_data: allProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
};

const AddimageAds = async (req, res) => {
    console.log(req.body);
    const { image, path } = req.body;

    try {
        if (!image) {
            return res.status(400).json({ response: "failure", response_message: "Image is invaild" });

        } else if (!path) {
            return res.status(400).json({ response: "failure", response_message: "Path is invaild" });

        }
        const imageCards = new ImageCards({
            image,
            path
        });

        // Save the instance to the database
        await imageCards.save();

        return res.status(200).json({ response: "success", response_data: imageCards });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
};

const AddimageAdsUpdate = async (req, res) => {
    const { id } = req.params;
    const { image, path } = req.body;
    try {
      if(!id){
        return res.status(400).json({ response: "failure", response_message: "Invalid url id" });
      }else if (!image) {
        return res.status(400).json({ response: "failure", response_message: "Invalid image" });
      } else if (!path) {
        return res.status(400).json({ response: "failure", response_message: "Invalid path" });
      }
      await ImageCards.findByIdAndUpdate(id , { image, path })
      return res.status(200).json({ response: "success", response_message: "Updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
}

const AddimageAdsDelete=async(req,res)=>{
    const { id } = req.params;
    try {
      // Find the parent category by ID and delete it
      const deletedParentCategory = await ImageCards.findByIdAndDelete(id);
  console.log("sa ",deletedParentCategory);
      // Check if the parent category exists
      if (!deletedParentCategory) {
        return res.status(404).json({ response: "failure", response_message: "Not found this record" });
      }
      fs.unlinkSync(deletedParentCategory.image);
  
      return res.status(200).json({ response: "success", response_message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
  };

module.exports = { imageAddsGet, AddimageAds, AddimageAdsUpdate, AddimageAdsDelete }