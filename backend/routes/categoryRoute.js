import express from 'express'
import { addCategory, listCategory, removeCategory } from '../controllers/categoryController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'

const categoryRouter = express.Router()

categoryRouter.post('/add', adminAuth, upload.single('image'), addCategory)
categoryRouter.post('/remove', adminAuth, removeCategory)
categoryRouter.get('/list', listCategory)

export default categoryRouter
