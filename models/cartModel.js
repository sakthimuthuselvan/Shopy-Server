const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    items: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
    ],
    // Other cart-related fields
}, { collection: "cartList" });

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = { CartModel }