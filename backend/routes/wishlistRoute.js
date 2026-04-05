import express from 'express';
import { toggleWishlist, getUserWishlist } from '../controllers/wishlistController.js';
import authUser from '../middleware/auth.js';

const wishlistRouter = express.Router();

wishlistRouter.post('/get', authUser, getUserWishlist);
wishlistRouter.post('/toggle', authUser, toggleWishlist);

export default wishlistRouter;
