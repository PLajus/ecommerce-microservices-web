import { Request, Response } from "express";

import { redis } from "../services/redis";
import { isEmpty } from "../utils/emptyObjectChecker";

class CartsController {
  async getAll(req: Request, res: Response) {
    const result = await redis.call("keys", "*");
    res.json(result);
  }
  async getCart(req: Request, res: Response) {
    const cart = await redis.hgetall(req.params.id);

    if (!isEmpty(cart)) {
      res.status(200).json(cart);
    } else {
      res.status(404).json(`Unable to find user with id: ${req.params.id}`);
    }
  }

  async getAmountofProduct(req: Request, res: Response) {
    const product = await redis.hget(req.params.id, req.body.productId);

    if (!isEmpty(product)) {
      res.status(200).json(product);
    } else {
      res
        .status(404)
        .json(
          `Unable to find product ${req.body.productId} in users ${req.params.id} cart`
        );
    }
  }

  async createCart(req: Request, res: Response) {
    const cart = await redis.hset(
      req.params.id,
      "items",
      JSON.stringify(req.body.items),
      "total",
      JSON.stringify(req.body.total)
    );

    if (cart >= 0) {
      res.status(200).json(`Created users ${req.params.id} cart`);
    } else {
      res.status(500).json(`Unable to create users ${req.params.id} carts`);
    }
  }

  async updateCart(req: Request, res: Response) {
    const updatedCart = await redis.hset(req.params.id, req.body);

    if (updatedCart >= 0) {
      res.status(200).json(`Updated users ${req.params.id} cart`);
    } else {
      res.status(404).json(`Unable to find user ${req.params.id}`);
    }
  }

  async deleteCart(req: Request, res: Response) {
    const deletedCart = await redis.del(req.params.id);

    if (deletedCart) {
      res.status(200).json(`Deleted users ${req.params.id} cart`);
    } else {
      res.status(400).json(`Unable to delete users ${req.params.id} cart`);
    }
  }
}

export default CartsController;
