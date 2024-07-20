const fs = require("fs")
const { ParentCategory } = require("../models/categoryModel");

const parentCategoryAdd = async (req, res) => {
  const { name, description, cate_img } = req.body;
  console.log(req.body);
  try {
    if (!name) {
      return res.status(400).json({ response: "failure", response_message: "Invalid category name" });
    } else if (!cate_img) {
      return res.status(400).json({ response: "failure", response_message: "Invalid category image" });
    }

    // Create an instance of ParentCategory with the data
    const newParentCategory = new ParentCategory({
      name,
      description,
      category_img: cate_img
    });

    // Save the instance to the database
    await newParentCategory.save();

    return res.status(200).json({ response: "success", response_message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
};

const getParentCategory = async (req, res) => {
  try {
    const allProducts = await ParentCategory.find();
    console.log('All Products:', allProducts);
    return res.status(200).json({ response: "success", response_data: allProducts });
  } catch (error) {
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
}

const parentCategoryUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, category_img } = req.body;
  console.log(category_img);
  try {
    if(!id){
      return res.status(400).json({ response: "failure", response_message: "Invalid category image" });
    }else if (!name) {
      return res.status(400).json({ response: "failure", response_message: "Invalid category name" });
    } else if (category_img === "") {
      return res.status(400).json({ response: "failure", response_message: "Invalid category image" });
    }
    await ParentCategory.findByIdAndUpdate(id , { name, category_img })
    return res.status(200).json({ response: "success", response_message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
};

const parentCategoryDelete=async(req,res)=>{
  const { id } = req.params;
  try {
    // Find the parent category by ID and delete it
    const deletedParentCategory = await ParentCategory.findByIdAndDelete(id);
console.log("sa ",deletedParentCategory);
    // Check if the parent category exists
    if (!deletedParentCategory) {
      return res.status(404).json({ response: "failure", response_message: "Category not found" });
    }
    fs.unlinkSync(deletedParentCategory.category_img);

    return res.status(200).json({ response: "success", response_message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
};


module.exports = { parentCategoryAdd, getParentCategory, parentCategoryUpdate, parentCategoryDelete };
