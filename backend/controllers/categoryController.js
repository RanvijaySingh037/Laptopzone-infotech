import categoryModel from "../models/categoryModel.js"
import { v2 as cloudinary } from "cloudinary"

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        const imageFile = req.file

        let imageUrl = ""
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            imageUrl = imageUpload.secure_url
        }

        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

        const categoryData = {
            name,
            description,
            image: imageUrl,
            slug
        }

        const category = new categoryModel(categoryData)
        await category.save()

        res.json({ success: true, message: "Category Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const listCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.json({ success: true, categories })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const removeCategory = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Category Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addCategory, listCategory, removeCategory }
