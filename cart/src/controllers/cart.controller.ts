import "dotenv/config";
import { Request, Response } from "express";
import RedisClient from "../services/database.client";
import { isEmpty } from "../utils/emptyObjectChecker";
import { processRequest } from "../utils/requestProcesser";

class CartController {
  async getCart(req: Request, res: Response) {
    const redisClient = new RedisClient();
    const params = processRequest(req);
    console.log(params);
    // const cart = await redisClient.getUsersCart(req?.params?.userid);
    const cart = await redisClient.getUsersCart(params);
    if (!isEmpty(cart)) {
      res.status(200).send(cart);
    } else {
      res.status(404).send(`Unable to find user with id: ${req.params.userid}`);
    }
  }

  async getAmountofProduct(req: Request, res: Response) {
    const redisClient = new RedisClient();
    const cart = await redisClient.getProductQuantity(
      req?.params?.userid,
      req?.params?.productid
    );
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
  async updateProductAmount(req: Request, res: Response) {
    const redisClient = new RedisClient();

    const updatedProducts = await redisClient.updateProduct(
      req?.params?.userid,
      req?.params?.productid,
      parseInt(req?.params?.amount)
    );
    console.log(updatedProducts);
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
