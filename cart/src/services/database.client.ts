import { RequestParams } from "../utils/requestParams";
import { redis } from "./redis";

class RedisClient {
  // public async getUsersCart(userID: string) {
  //   return await redis.hgetall(userID);
  // }
  public async getUsersCart(params: RequestParams) {
    return await redis.hgetall(params["userid"]);
  }

  public async getProductQuantity(userID: string, productID: string) {
    return await redis.hget(userID, productID);
  }

  public async updateProduct(userID: string, productID: string, amount = 1) {
    // console.log(userID, productID, amount);
    return await redis.hset(userID, { productID: amount });
  }

  public async deleteProduct(userID: string, productID: string) {
    return await redis.hdel(userID, productID);
  }
}

export default RedisClient;
