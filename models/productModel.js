const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    parent_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    child_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    messure: {
        type: String,
    },
    total_quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cover_image: {
        type: String,
        required: true
    },
    product_images: {
        type: [String],
        required: true
    },
    currency: {
        type: String,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
}, { collection: "products" });

const ProductModel = mongoose.model("products", Product)

module.exports = { ProductModel };


