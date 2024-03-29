import { Request, Response } from "express";
import mongoose from "mongoose";

import Product from "../models/product";

class ProductController {
  async getAllProducts(_req: Request, res: Response) {
    const products = await Product.find({});

    return res.json(products);
  }

  async getProduct(req: Request, res: Response) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res
          .status(400)
          .json(`Product with id: ${req.params.id} not found!`);
      }
      return res.json(product);
    }
    return res.status(400).json("Invalid ID");
  }

  async createProduct(req: Request, res: Response) {
    const result = await Product.create(new Product(req.body));

    res.json(result);
  }

  async updateProduct(req: Request, res: Response) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const result = await Product.findByIdAndUpdate(req.params.id, req.body);

      return res.json(result);
    }
    return res.status(400).json("Invalid ID");
  }

  async deleteProduct(req: Request, res: Response) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const result = await Product.findByIdAndDelete(req.params.id);

      return res.json(result);
    }
    return res.status(400).json("Invalid ID");
  }
}

export default ProductController;
