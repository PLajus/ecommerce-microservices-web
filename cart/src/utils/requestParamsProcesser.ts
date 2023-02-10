import { Request } from "express";
import { Cart } from "../models/cart";

//TODO: make this a middleware

export function processRequestParams(req: Request): Cart {
  let cart: Cart = { userid: "" };

  if (req?.params?.userid) {
    cart["userid"] = req.params.userid;
  }
  if (req?.params?.productid) {
    cart["productid"] = req.params.productid;
  }
  if (parseInt(req?.params?.amount) >= 0) {
    cart["amount"] = parseInt(req.params.amount);
  }
  return cart;
}
