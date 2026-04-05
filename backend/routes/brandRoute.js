import express from 'express'
import { addBrand, listBrands, removeBrand } from '../controllers/brandController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'

const brandRouter = express.Router()

brandRouter.post('/add', adminAuth, upload.single('image'), addBrand)
brandRouter.post('/remove', adminAuth, removeBrand)
brandRouter.get('/list', listBrands)

export default brandRouter
