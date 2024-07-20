const mongoose = require('mongoose');


const wishlistModel = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    items: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
    ],
    // Other cart-related fields
}, { collection: "wishlist" });

const WishModel = mongoose.model('wishlist', wishlistModel);

module.exports = { WishModel }