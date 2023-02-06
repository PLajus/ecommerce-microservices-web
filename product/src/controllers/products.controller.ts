import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Product from "../models/product";

class ProductsController {
  async getAllProducts(_req: Request, res: Response): Promise<void> {
    try {
      const products = (await collections
        .products!.find({})
        .toArray()) as unknown as Product[];

      res.status(200).send(products);
    } catch (error) {
      error instanceof Error
        ? res.status(500).send(error.message)
        : res.status(500).send("Something went wrong!");
      console.error(error);
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    const id = req?.params?.id;

    try {
      const query = { _id: new ObjectId(id) };
      const product = (await collections.products!.findOne(
        query
      )) as unknown as Product;

      if (product) {
        res.status(200).send(product);
      }
    } catch (error) {
      res
        .status(404)
        .send(`Unable to find matching document with id: ${req.params.id}`);
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const newProduct = req.body as Product;
      const result = await collections.products!.insertOne(newProduct);

      result
        ? res
            .status(201)
            .send(
              `Successfully created a new product with id ${result.insertedId}`
            )
        : res.status(500).send("Failed to create a new product.");
    } catch (error) {
      error instanceof Error
        ? res.status(400).send(error.message)
        : res.status(400).send("Something went wrong!");
      console.error(error);
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const id = req?.params?.id;

    try {
      const updatedProduct: Product = req.body as Product;
      const query = { _id: new ObjectId(id) };

      const result = await collections.products!.updateOne(query, {
        $set: updatedProduct,
      });

      result
        ? res.status(200).send(`Successfully updated product with id ${id}`)
        : res.status(304).send(`Producr with id: ${id} not updated`);
    } catch (error) {
      error instanceof Error
        ? res.status(400).send(error.message)
        : res.status(400).send("Something went wrong!");
      console.error(error);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const id = req?.params?.id;

    try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.products!.deleteOne(query);

      if (result && result.deletedCount) {
        res.status(202).send(`Successfully removed product with id ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove product with id ${id}`);
      } else if (!result.deletedCount) {
        res.status(404).send(`Product with id ${id} does not exist`);
      }
    } catch (error) {
      error instanceof Error
        ? res.status(400).send(error.message)
        : res.status(400).send("Something went wrong!");
      console.error(error);
    }
  }
}

export default ProductsController;
