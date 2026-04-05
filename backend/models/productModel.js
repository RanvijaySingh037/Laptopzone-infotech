import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'brand' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subCategory: { type: String },
    series: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountPercent: { type: Number },
    shortDescription: { type: String },
    description: { type: String, required: true },
    processor: { type: String },
    ram: { type: String },
    storage: { type: String },
    storageType: { type: String },
    display: { type: String },
    displaySize: { type: String },
    resolution: { type: String },
    graphics: { type: String },
    operatingSystem: { type: String },
    battery: { type: String },
    weight: { type: String },
    color: { type: String },
    warranty: { type: String },
    stock: { type: Number, default: 0 },
    sku: { type: String },
    condition: { type: String, default: "New" },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    image: { type: Array, required: true },
    date: { type: Number, required: true } // Kept for compatibility, though timestamps are better
}, { timestamps: true });

const productModel  = mongoose.model.product || mongoose.model("product",productSchema)

export default productModel