import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import categoryModel from "../models/categoryModel.js";
import brandModel from "../models/brandModel.js";
import connectDB from "./mongodb.js";

const categories = [
    { name: "Gaming Laptops", slug: "gaming-laptops", description: "High-performance laptops for gaming." },
    { name: "Student Laptops", slug: "student-laptops", description: "Affordable and reliable laptops for students." },
    { name: "Business Laptops", slug: "business-laptops", description: "Portable and secure laptops for professionals." },
    { name: "Budget Laptops", slug: "budget-laptops", description: "Essential laptops at the best price." },
    { name: "Premium Laptops", slug: "premium-laptops", description: "High-end laptops with top-tier builds." },
    { name: "Creator Laptops", slug: "creator-laptops", description: "Powerful laptops for content creators." }
];

const brands = [
    { name: "HP", description: "Hewlett-Packard laptops." },
    { name: "Dell", description: "Dell computing solutions." },
    { name: "Lenovo", description: "Lenovo ThinkPad and Ideapad series." },
    { name: "ASUS", description: "ASUS ROG and Zenbook laptops." },
    { name: "Acer", description: "Acer Aspire and Predator series." },
    { name: "MSI", description: "MSI gaming and workstation laptops." },
    { name: "Apple", description: "Apple MacBook Air and Pro series." }
];

const seedData = async () => {
    try {
        await connectDB();
        
        // Seed Categories
        for (const cat of categories) {
            const existingCat = await categoryModel.findOne({ name: cat.name });
            if (!existingCat) {
                await categoryModel.create(cat);
                console.log(`Added category: ${cat.name}`);
            }
        }

        // Seed Brands
        for (const brand of brands) {
            const existingBrand = await brandModel.findOne({ name: brand.name });
            if (!existingBrand) {
                await brandModel.create(brand);
                console.log(`Added brand: ${brand.name}`);
            }
        }

        console.log("Seeding completed successfully!");
        process.exit();
    } catch (error) {
        console.error("Seeding failed with error:", error.message);
        console.error(error);
        process.exit(1);
    }
};

seedData();
