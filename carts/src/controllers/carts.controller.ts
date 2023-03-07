import "dotenv/config";
import { Request, Response } from "express";
import { redis } from "../services/redis";
import { isEmpty } from "../utils/emptyObjectChecker";

class CartsController {
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

  async updateOrCreateCart(req: Request, res: Response) {
    //TODO: add user auth check

    const updatedCart = await redis.hset(req.params.id, req.body);

    if (updatedCart >= 0) {
      res.status(200).json(`Updated users ${req.params.id} cart`);
    } else {
      res.status(404).json(`Unable to find user ${req.params.id}`);
    }
  }

  async removeOneProduct(req: Request, res: Response) {
    //TODO: add user auth check

    const productAmount = await redis.hget(req.params.id, req.body.productId);

    if (productAmount) {
      let numProductAmount = parseInt(productAmount);

      if (numProductAmount > 1) {
        await redis.hset(
          req.params.id,
          {
            [req.body.productId]: --numProductAmount,
          },
          (err, result) => {
            if (err) {
              res.status(400).json(`There was an error: ${err}`);
            } else {
              res.json(`${result} products updated`);
            }
          }
        );
      } else {
        await redis.hdel(req.params.id, req.body.productId, (err, result) => {
          if (err) {
            res.status(400).json(`There was an error: ${err}`);
          } else {
            res.json(`${result} products updated`);
          }
        });
      }
    }
  }

  async deleteCart(req: Request, res: Response) {
    //TODO: add user auth check

    const deletedCart = await redis.del(req.params.id);

    if (deletedCart) {
      res.status(200).json(`Deleted users ${req.params.id} cart`);
    } else {
      res.status(400).json(`Unable to delete users ${req.params.id} cart`);
    }
  }
}

export default CartsController;
