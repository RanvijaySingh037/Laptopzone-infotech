import brandModel from "../models/brandModel.js"
import { v2 as cloudinary } from "cloudinary"

const addBrand = async (req, res) => {
    try {
        const { name, description } = req.body
        const imageFile = req.file

        let imageUrl = ""
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            imageUrl = imageUpload.secure_url
        }

        const brandData = {
            name,
            description,
            image: imageUrl
        }

        const brand = new brandModel(brandData)
        await brand.save()

        res.json({ success: true, message: "Brand Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const listBrands = async (req, res) => {
    try {
        const brands = await brandModel.find({})
        res.json({ success: true, brands })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const removeBrand = async (req, res) => {
    try {
        await brandModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Brand Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addBrand, listBrands, removeBrand }
