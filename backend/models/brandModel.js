import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String }
}, { timestamps: true });

const brandModel = mongoose.models.brand || mongoose.model("brand", brandSchema);

export default brandModel;
