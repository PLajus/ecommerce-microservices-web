import "dotenv/config";
import { Request, Response } from "express";
import RedisClient from "../services/database.client";
import { isEmpty } from "../utils/emptyObjectChecker";
import { processRequestParams } from "../utils/requestParamsProcesser";

class CartController {
  async getCart(req: Request, res: Response) {
    const redisClient = new RedisClient();
    const params = processRequestParams(req);

    const cart = await redisClient.getUsersCart(params);
    if (!isEmpty(cart)) {
      res.status(200).send(cart);
    } else {
      res.status(404).send(`Unable to find user with id: ${req.params.userid}`);
    }
  }

  async getAmountofProduct(req: Request, res: Response) {
    const redisClient = new RedisClient();
    const params = processRequestParams(req);

    const cart = await redisClient.getProductQuantity(params);
    if (!isEmpty(cart)) {
      res.status(200).send(cart);
    } else {
      res
        .status(404)
        .send(
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
      res.status(200).send(`Updated users ${req.params.userid} cart`);
    } else {
      res.status(404).send(`Unable to find user ${req.params.userid}`);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    //TODO: add user auth check

    const redisClient = new RedisClient();
    const params = processRequestParams(req);

    const updatedProducts = await redisClient.deleteProduct(params);
    if (updatedProducts) {
      res
        .status(200)
        .send(
          `Product ${req.params.productid} updated in users ${req.params.userid} cart`
        );
    } else {
      res
        .status(404)
        .send(
          `Unable to find product ${req.params.userid} in users ${req.params.productid} cart`
        );
    }
  }
}

export default CartController;
