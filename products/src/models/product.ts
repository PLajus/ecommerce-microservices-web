import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "Product description",
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 1.0,
    },
    imageFileName: {
      type: String,
      default: "../public/images",
    },
    inStockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
