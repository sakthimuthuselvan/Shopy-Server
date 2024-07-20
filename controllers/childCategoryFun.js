const fs = require("fs")
const { ChildCategory, ParentCategory } = require("../models/categoryModel");


const childCatgoryAdd = async (req, res) => {
  const { child_category_name, child_category_img, description, parent_category_id } = req.body;
  try {
    if (!parent_category_id) {
      return res.status(400).json({ response: "failure", response_message: "Invalid parent category id" });
    } else if (!child_category_img) {
      return res.status(400).json({ response: "failure", response_message: "Invalid child category image" });
    } else if (!child_category_name) {
      return res.status(400).json({ response: "failure", response_message: "Invalid child category name" });

    }

    ChildCategory.create({
      parent_category_id,
      child_category_name,
      child_category_img,
      description
    });

    return res.status(200).json({ response: "success", response_message: "Child category added successfully" });
  } catch (error) {
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
};

const getChildCatgory = async (req, res) => {
  try {
    const allProducts = await ChildCategory.find();
    const parentCategories = await ParentCategory.find({},"name");

    const newFilter = allProducts.map(item => {
      const parentCategory = parentCategories.find(parent => parent._id.equals(item.parent_category_id));
      return {
        _id:item._id,
        parent_category_name: parentCategory ? parentCategory : "Unknown",
        child_category_name: item.child_category_name,
        child_category_img: item.child_category_img,
        description: item.description
      };
    });

    return res.status(200).json({ response: "success", response_data: newFilter });
  } catch (error) {
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
}

const childCategoryUpdate = async (req, res) => {
  const { id } = req.params;
  const { child_category_name, child_category_img, description, parent_category_id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ response: "failure", response_message: "Invalid category ID" });
    } else if (!parent_category_id) {
      return res.status(400).json({ response: "failure", response_message: "Invalid parent category id" });
    } else if (!child_category_img) {
      return res.status(400).json({ response: "failure", response_message: "Invalid child category image" });
    } else if (!child_category_name) {
      return res.status(400).json({ response: "failure", response_message: "Invalid child category name" });

    }

    await ChildCategory.findByIdAndUpdate(id, { child_category_name, child_category_img, description, parent_category_id })
    return res.status(200).json({ response: "success", response_message: "Child category updated successfully" });
  } catch (error) {
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
};


const childCategoryDelete = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the parent category by ID and delete it
    const deletedParentCategory = await ChildCategory.findByIdAndDelete(id);
    // Check if the parent category exists
    if (!deletedParentCategory) {
      return res.status(404).json({ response: "failure", response_message: "Child category not found" });
    }
    fs.unlinkSync(deletedParentCategory.child_category_img);

    return res.status(200).json({ response: "success", response_message: "Child category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
  }
};

const parentCategoryData = async (req, res) => {
  try {
    const categories = await ParentCategory.find({},"name");
    res.status(200).json({ response: "success", response_data: categories })
  } catch {
    return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });

  }
}

module.exports = { childCatgoryAdd, getChildCatgory, childCategoryUpdate, childCategoryDelete, parentCategoryData }