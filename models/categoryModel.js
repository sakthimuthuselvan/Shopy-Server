const mongoose = require('mongoose');

const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category_img: {
        type: String,
        required: true
    }
});

const childCategoryShema = new mongoose.Schema({
    parent_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"categories"
    },
    child_category_name: {
        type: String,
        required: true,
    },
    child_category_img: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
},{collection:"childCategories"});

const ParentCategory = mongoose.model("categories", categoryShema)
const ChildCategory = mongoose.model("childCategories", childCategoryShema)

module.exports = { ParentCategory, ChildCategory };