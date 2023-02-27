import { Request, Response } from "express";
import { Order } from "../models/order";
import { OrderItems } from "../models/order.items";
import { Address as ShippingAddress } from "../models/address";
import { Payment } from "../models/payment";

class OrdersController {
  async getAll(_req: Request, res: Response) {
    const orders = await Order.findAll();
    res.json(orders);
  }

  async getOrder(req: Request, res: Response) {
    const order = await Order.findOne({
      where: { id: req.params.id },
      include: [OrderItems, ShippingAddress, Payment],
    }).catch((err) =>
      res.status(500).json({
        status: "fail",
        message: err.message || "An error occurred while creating the order.",
      })
    );
    if (order) {
      res.json(order);
    } else {
      res
        .status(404)
        .json(`Order with id: ${req.params.id} couldn't be found!`);
    }
  }

  async createOrder(req: Request, res: Response) {
    const order = await Order.create(req.body.orderInfo).catch((err) =>
      res.status(500).json({
        status: "fail",
        message: err.message || "An error occurred while creating the order.",
      })
    );

    let orderId: any = -1;
    if ("id" in order) {
      orderId = order.id;
    }

    const orderItems = req.body.items;

    for (const item in orderItems) {
      const itemID = Object.keys(orderItems[item]);
      await OrderItems.create({
        itemId: itemID[0],
        itemAmount: orderItems[item][itemID[0]],
        orderId: orderId,
      });
    }
    res.json(`Order ${orderId} created successfully!`);
  }

  async updateOrderShippingInfo(req: Request, res: Response) {}

  async updateOrderPaymentInfo() {}

  async updateOrderStatus(req: Request, res: Response) {}
}

export default OrdersController;
