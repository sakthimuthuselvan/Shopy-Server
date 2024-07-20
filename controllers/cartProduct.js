
const { decrypt, encrypt } = require("../utilities/index");
const { UserSchema } = require("../models/userCreateModels");
const { CartModel } = require("../models/cartModel");
const { ProductModel } = require("../models/productModel");
const { mongoose } = require("mongoose");



const addTOCart = async (req, res) => {
  const { data } = req.body;
  const datares = encrypt(JSON.stringify(data));
  const { user_id, product_id } = JSON.parse(decrypt(datares));

  try {
    const user = await UserSchema.findById(user_id);
    if (!user) {
      return res.status(403).json({ error_message: "Invalid user" });
    }

    let cart = await CartModel.findOne({ user: user._id });
    if (!cart) {
      cart = new CartModel({
        user: user._id,
        items: []
      });
    }

    cart.items.push(product_id); // Assuming product_id is the ObjectId of the product

    await cart.save();
    res.status(200).json({ response_type: "success", response_message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const revomeFromCart = async (req, res) => {
  const { data } = req.body;
  const datares = encrypt(JSON.stringify(data))
  const { user_id, product_id } = JSON.parse(decrypt(datares));
  try {
    // Find the user's cart
    const cart = await CartModel.findOne({ user: user_id });
    console.log("cartcart ", cart);
    if (!cart) {
      return res.status(404).json({ error_message: "Cart not found" });
    }
    console.log("cart.items ", cart.items);
    // Remove the product from the cart items array
    let updatedItems = cart.items.filter(item => !item.equals(product_id));

    // Save the updated cart
    cart.items = updatedItems;
    await cart.save();

    res.status(200).json({ message: "Product removed from cart successfully", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const cartList = async (req, res) => {
  try {
    const { data } = req.body;
    const datares = encrypt(JSON.stringify(data));
    const { user_id } = JSON.parse(decrypt(datares));

    const user = await CartModel.findOne({ user: user_id });
    const productList = await ProductModel.find();

    // console.log("user ", user);

    // Filter user's cart items based on product IDs
    // const overall = user.items.map((item) => {
    //   // Find the product matching the item ID
    //   const matchedProduct = productList.find((each) => item.equals(each._id));

    //   // If a matching product is found, return it; otherwise, return undefined
    //   return matchedProduct;
    // })
    // .filter((product) => product !== undefined); // Filter out any undefined values


    const overall = await CartModel.aggregate([
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


    res.status(200).json({ cartItems: overall }); // Send filtered cart items in response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' }); // Send 500 status and error message if an error occurs
  }
};



module.exports = { addTOCart, revomeFromCart, cartList }