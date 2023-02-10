import { Request } from "express";
import { RequestParams } from "./requestParams";

export function processRequest(req: Request): RequestParams {
  let params: RequestParams = { userid: "" };
  if (req?.params?.userid) {
    params["userid"] = req.params.userid;
  }
  if (req?.params?.productid) {
    params["productid"] = req.params.productid;
  }
  if (req?.params?.amount) {
    params["amount"] = parseInt(req.params.amount);
  }
  return params;
}
