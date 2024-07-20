const fs = require("fs")
const { ProductModel } = require("../models/productModel");



const getAllProducts = async (req, res) => {
    try {
        const allProducts = await ProductModel.find();
        console.log('All Products:', allProducts);
        return res.status(200).json({ response: "success", response_data: allProducts });
    } catch (error) {
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
}



const productAdd = async (req, res) => {
    // parent_category_id,child_category_id,messure,total_quantity,price,cover_image,product_images,currency,createdAt,updatedAt
    const { product_name, parent_category_id, child_category_id, messure, total_quantity, price, cover_image, product_images, currency, description } = req.body;
    try {
        if (!product_name) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product name" });
        } else if (!parent_category_id) {
            return res.status(400).json({ response: "failure", response_message: "Invalid parent category id" });
        } else if (!child_category_id) {
            return res.status(400).json({ response: "failure", response_message: "Invalid child category id" });
        } else if (!total_quantity) {
            return res.status(400).json({ response: "failure", response_message: "Invalid total quantity" });
        } else if (!price) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product price" });
        } else if (!cover_image) {
            return res.status(400).json({ response: "failure", response_message: "Invalid cover image" });
        } else if (!price) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product price" });
        } else if (!cover_image) {
            return res.status(400).json({ response: "failure", response_message: "Invalid cover image" });
        } else if (!product_images) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product images" });
        } else if (!currency) {
            return res.status(400).json({ response: "failure", response_message: "Invalid currency" });
        } else if (!description) {
            return res.status(400).json({ response: "failure", response_message: "Invalid description" });
        }

        const newProduct = new ProductModel({
            parent_category_id,
            child_category_id,
            product_name,
            messure,
            total_quantity,
            price,
            cover_image,
            product_images,
            currency,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newProduct.save(); // Save the new product instance

        return res.status(200).json({ response: "success", response_message: "Product successfully added" });
    } catch (error) {
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
}


const productUpdate = async (req, res) => {
    const { id } = req.params;
    const { product_name, parent_category_id, child_category_id, messure, total_quantity, price, cover_image, product_images, currency, description } = req.body;
    try {
        if (!product_name) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product name" });
        } else if (!parent_category_id) {
            return res.status(400).json({ response: "failure", response_message: "Invalid parent category id" });
        } else if (!child_category_id) {
            return res.status(400).json({ response: "failure", response_message: "Invalid child category id" });
        } else if (!total_quantity) {
            return res.status(400).json({ response: "failure", response_message: "Invalid total quantity" });
        } else if (!price) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product price" });
        } else if (!cover_image) {
            return res.status(400).json({ response: "failure", response_message: "Invalid cover image" });
        } else if (!price) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product price" });
        } else if (!cover_image) {
            return res.status(400).json({ response: "failure", response_message: "Invalid cover image" });
        } else if (!product_images) {
            return res.status(400).json({ response: "failure", response_message: "Invalid product images" });
        } else if (!currency) {
            return res.status(400).json({ response: "failure", response_message: "Invalid currency" });
        } else if (!description) {
            return res.status(400).json({ response: "failure", response_message: "Invalid description" });
        }

        await ProductModel.findByIdAndUpdate(id, {
            product_name, parent_category_id, child_category_id, messure, total_quantity, price, cover_image, product_images, currency, description, updatedAt: new Date()
        })

        return res.status(200).json({ response: "success", response_message: "Product successfully updated" });
    } catch (error) {
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
}

const producDelete = async (req, res) => {
    const { id } = req.params;
    console.log("hjjjjjjj ",id);
    try {
        // Find the parent category by ID and delete it
        const products = await ProductModel.findByIdAndDelete(id);
        console.log("sa ", products);
        // Check if the parent category exists
        if (!products) {
            return res.status(404).json({ response: "failure", response_message: "product not found" });
        }
        fs.unlinkSync(products.cover_image);
        products.product_images.forEach((item)=>{
            fs.unlinkSync(item);
        })

        return res.status(200).json({ response: "success", response_message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ response: "failure", response_message: "Internal Server Error" });
    }
};

module.exports = { productAdd, productUpdate, getAllProducts, producDelete }