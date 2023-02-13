import { Cart } from "../models/cart";
import { redis } from "./redis";

class RedisClient {
  public async getUsersCart(cart: Cart) {
    return await redis.hgetall(cart["userid"]);
  }

  public async getProductQuantity(cart: Cart) {
    return await redis.hget(cart["userid"], cart["productid"]!);
  }

  public async updateCart(userid: string, product: Object) {
    return await redis.hset(userid, product);
  }

  public async deleteProduct(cart: Cart) {
    return await redis.hdel(cart["userid"], cart["productid"]!);
  }
  public async deleteCart(userid: string) {
    return await redis.del(userid);
  }
}

export default RedisClient;
