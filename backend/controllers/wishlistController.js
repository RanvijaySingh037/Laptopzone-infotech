import userModel from "../models/userModel.js";

// Toggle product in user wishlist
const toggleWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);
        let wishlistData = await userData.wishlistData || {};

        if (wishlistData[itemId]) {
            delete wishlistData[itemId];
            await userModel.findByIdAndUpdate(userId, { wishlistData });
            res.json({ success: true, message: "Removed from Wishlist", action: "removed" });
        } else {
            wishlistData[itemId] = true;
            await userModel.findByIdAndUpdate(userId, { wishlistData });
            res.json({ success: true, message: "Added to Wishlist", action: "added" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get user wishlist data
const getUserWishlist = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        let wishlistData = await userData.wishlistData || {};

        res.json({ success: true, wishlistData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { toggleWishlist, getUserWishlist }
