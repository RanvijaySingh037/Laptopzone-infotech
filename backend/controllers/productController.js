import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import brandModel from "../models/brandModel.js";
// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { 
            name, slug, brand, category, subCategory, series, price, originalPrice, 
            discountPercent, shortDescription, description, processor, ram, storage, 
            storageType, display, displaySize, resolution, graphics, operatingSystem, 
            battery, weight, color, warranty, stock, sku, condition, featured, 
            bestseller, trending, ratingsAverage, ratingsCount 
        } = req.body;
        
        // Ensure req.files is defined before accessing properties
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter(item => item);

        // Upload images to Cloudinary and get URLs
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Create product data object with technical specs
        const productData = {
            name,
            slug,
            brand,
            category,
            subCategory,
            series,
            price: Number(price),
            originalPrice: originalPrice ? Number(originalPrice) : undefined,
            discountPercent: discountPercent ? Number(discountPercent) : undefined,
            shortDescription,
            description,
            processor,
            ram,
            storage,
            storageType,
            display,
            displaySize,
            resolution,
            graphics,
            operatingSystem,
            battery,
            weight,
            color,
            warranty,
            stock: Number(stock) || 0,
            sku,
            condition,
            featured: featured === "true",
            bestseller: bestseller === "true",
            trending: trending === "true",
            ratingsAverage: Number(ratingsAverage) || 0,
            ratingsCount: Number(ratingsCount) || 0,
            image: imagesUrl,
            date: Date.now()
        };

        console.log("Saving Product:", productData);

        // Save product to database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Laptop Added Successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list all products
const listProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            // Smart Search: Match across multiple technical and brand fields
            const searchRegex = new RegExp(search, 'i');

            // Pre-fetch brand & category IDs matching the name to include in product query
            const [matchedBrands, matchedCategories] = await Promise.all([
                brandModel.find({ name: searchRegex }, '_id'),
                categoryModel.find({ name: searchRegex }, '_id')
            ]);

            query = {
                $or: [
                    { name: searchRegex },
                    { processor: searchRegex },
                    { ram: searchRegex },
                    { storage: searchRegex },
                    { graphics: searchRegex },
                    { description: searchRegex },
                    { shortDescription: searchRegex },
                    { brand: { $in: matchedBrands.map(b => b._id) } },
                    { category: { $in: matchedCategories.map(c => c._id) } }
                ]
            };
        }

        const products = await productModel.find(query).populate('category').populate('brand');
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to update an existing product
// Function to get a single product by ID
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body; // In some places it's body, in others params. Standardizing to body for admin hidden fetch or ID in req.
        const id = productId || req.query.id || req.params.id;
        
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await productModel.findById(id).populate('category').populate('brand');
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to update an existing product
const updateProduct = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required for update" });
        }

        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Handle Image updates
        // We expect currentImages to be a JSON string or an array of URLs to keep
        let currentImagesUrls = [];
        try {
            if (typeof updateData.currentImages === 'string') {
                currentImagesUrls = JSON.parse(updateData.currentImages);
            } else if (Array.isArray(updateData.currentImages)) {
                currentImagesUrls = updateData.currentImages;
            } else {
                currentImagesUrls = existingProduct.image; // Fallback to current if not provided
            }
        } catch (e) {
            currentImagesUrls = existingProduct.image;
        }

        let updatedImages = [...currentImagesUrls];
        
        const imageFiles = [
            req.files?.image1?.[0],
            req.files?.image2?.[0],
            req.files?.image3?.[0],
            req.files?.image4?.[0]
        ];

        for (let i = 0; i < imageFiles.length; i++) {
            if (imageFiles[i]) {
                const result = await cloudinary.uploader.upload(imageFiles[i].path, { resource_type: 'image' });
                // If there's an empty slot or we replace, logic depends on frontend's intent.
                // For simplicity, we'll append new ones or replace at index if desired.
                // Better approach: if it's a new upload for slot X, we place it there.
                updatedImages.push(result.secure_url);
            }
        }

        // Clean up undefined or empty entries in the array and cap it if necessary
        updatedImages = updatedImages.filter(url => url);

        // Prepare the final update object
        const finalUpdate = {
            ...updateData,
            price: Number(updateData.price),
            originalPrice: updateData.originalPrice ? Number(updateData.originalPrice) : undefined,
            discountPercent: updateData.discountPercent ? Number(updateData.discountPercent) : undefined,
            stock: Number(updateData.stock) || 0,
            featured: updateData.featured === "true",
            bestseller: updateData.bestseller === "true",
            trending: updateData.trending === "true",
            ratingsAverage: Number(updateData.ratingsAverage) || 0,
            ratingsCount: Number(updateData.ratingsCount) || 0,
            image: updatedImages
        };

        const updatedProduct = await productModel.findByIdAndUpdate(id, finalUpdate, { new: true });

        res.json({ success: true, message: "Laptop Updated Successfully", updatedProduct });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct };
