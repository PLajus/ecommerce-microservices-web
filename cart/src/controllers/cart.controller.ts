import "dotenv/config";
import { Request, Response } from "express";
import RedisClient from "../services/redis.client";
import { isEmpty } from "../utils/emptyObjectChecker";
import { processRequestParams } from "../utils/requestParamsProcesser";

class CartController {
  redisClient: RedisClient;
  constructor() {
    this.redisClient = new RedisClient();
  }

  async getCart(req: Request, res: Response) {
    const params = processRequestParams(req);
    const cart = await this.redisClient.getUsersCart(params);
    if (!isEmpty(cart)) {
      res.status(200).json(cart);
    } else {
      res.status(404).json(`Unable to find user with id: ${req.params.userid}`);
    }
  }

  async getAmountofProduct(req: Request, res: Response) {
    const params = processRequestParams(req);
    const cart = await this.redisClient.getProductQuantity(params);
    if (!isEmpty(cart)) {
      res.status(200).json(cart);
    } else {
      res
        .status(404)
        .json(
          `Unable to find product ${req.params.userid} in users ${req.params.productid} cart`
        );
    }
  }

  async updateCart(req: Request, res: Response) {
    //TODO: add user auth check

    const redisClient = new RedisClient();

    const updatedCart = await redisClient.updateCart(
      req?.params?.userid,
      req?.body
    );
    if (updatedCart >= 0) {
      res.status(200).json(`Updated users ${req.params.userid} cart`);
    } else {
      res.status(404).json(`Unable to find user ${req.params.userid}`);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    //TODO: add user auth check

    const redisClient = new RedisClient();
    const params = processRequestParams(req);

    const deletedProducts = await redisClient.deleteProduct(params);
    if (deletedProducts >= 0) {
      res
        .status(200)
        .json(
          `Product ${req.params.productid} deleted in users ${req.params.userid} cart`
        );
    } else {
      res
        .status(400)
        .json(
          `Unable to delete product ${req.params.userid} in users ${req.params.productid} cart`
        );
    }
  }

  async deleteCart(req: Request, res: Response) {
    //TODO: add user auth check

    const redisClient = new RedisClient();

    const deletedCart = await redisClient.deleteCart(req?.params?.userid);
    if (deletedCart) {
      res.status(200).json(`Deleted users ${req.params.userid} cart`);
    } else {
      res.status(400).json(`Unable to delete users ${req.params.userid} cart`);
    }
  }
}

export default CartController;
