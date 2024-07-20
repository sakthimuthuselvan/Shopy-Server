
const { decrypt, encrypt } = require("../utilities/index");
const { UserSchema } = require("../models/userCreateModels");
const { WishModel } = require("../models/wishListModel");
const { mongoose } = require("mongoose");


const addWhishList = async (req, res) => {
    const { data } = req.body;
    const datares = encrypt(JSON.stringify(data));
    console.log("datares",datares);
    const { user_id, product_id } = JSON.parse(decrypt(datares));

    try {
        const user = await UserSchema.findById(user_id);
        console.log(user);
        if (!user) {
            return res.status(403).json({ response_type: "error", error_message: "Invalid user" });
        }

        let cart = await WishModel.findOne({ user: user._id });
        if (!cart) {
            cart = new WishModel({
                user: user._id,
                items: []
            });
        }

        cart.items.push(product_id); // Assuming product_id is the ObjectId of the product

        await cart.save();
        res.status(200).json({ response_type: "success", response_message: "Product added to wishlist successfully" });
    } catch (error) {
        res.status(500).json({ error_message: 'Internal server error' });
    }
}


const revomeFromWhishList = async (req, res) => {
    const { data } = req.body;
    const datares = encrypt(JSON.stringify(data))
    const { user_id, product_id } = JSON.parse(decrypt(datares));
    try {
        // Find the user's cart
        const cart = await WishModel.findOne({ user: user_id });
        if (!cart) {
            return res.status(404).json({ error_message: "wishlist not found" });
        }
        // Remove the product from the cart items array
        let updatedItems = cart.items.filter(item => !item.equals(product_id));

        // Save the updated cart
        cart.items = updatedItems;
        await cart.save();

        res.status(200).json({ message: "Product removed from wishlist successfully", cart });
    } catch (error) {
        res.status(500).json({ error_message: 'Internal server error' });
    }
}

// const overallWhishList = async (req, res) => {
//     const { data } = req.body;
//     const datares = encrypt(JSON.stringify(data))
//     const { user_id } = JSON.parse(decrypt(datares));
//     try {
//         const cart = await WishModel.find({ user: user_id });
//         res.status(200).json({ response: "success", response_message: cart });
//     } catch (error) {
//         res.status(500).json({ error_message: 'Internal server error' });
//     }
// }

const overallWhishList = async (req, res) => {
    try {
        const { data } = req.body;
        const datares = encrypt(JSON.stringify(data));
        const { user_id } = JSON.parse(decrypt(datares));

        //   const user = await WishModel.findOne({ user: user_id });
        //   const productList = await ProductModel.find();

        // Filter user's cart items based on product IDs
        // const overall = user.items.map((item) => {
        //   // Find the product matching the item ID
        //   const matchedProduct = productList.find((each) => item.equals(each._id));

        //   // If a matching product is found, return it; otherwise, return undefined
        //   return matchedProduct;
        // })
        // .filter((product) => product !== undefined); // Filter out any undefined values


        const overall = await WishModel.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(user_id) } // Match the user by user ID
            },
            {
                $unwind: "$items" // Deconstruct the array field 'items' into separate documents
            },
            {
                $lookup: {
                    from: "products", // The collection to join with
                    localField: "items",
                    foreignField: "_id",
                    as: "matchedProducts" // The field to store the matched products
                }
            },
            {
                $unwind: "$matchedProducts" // Deconstruct the array field 'matchedProducts' into separate documents
            },
            {
                $replaceRoot: { newRoot: "$matchedProducts" } // Replace the root document with the matched product
            }
        ]);

        console.log("overall ", overall);


        res.status(200).json({ response_type: "success", wishlist: overall }); // Send filtered cart items in response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Send 500 status and error message if an error occurs
    }
};


module.exports = { addWhishList, overallWhishList, revomeFromWhishList }