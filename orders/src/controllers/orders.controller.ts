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
    const order = await Order.create(req.body.order).catch((err) =>
      res.status(500).json({
        status: "fail",
        message: err.message || "An error occurred while creating the order.",
      })
    );

    let orderId: any = -1;
    if ("id" in order) {
      orderId = order.id;
    }

    const orderItems = req.body.order;

    for (const i in orderItems) {
      const item = Object.keys(orderItems[i]);
      await OrderItems.create({
        itemId: item[0],
        itemAmount: orderItems[i][item[0]],
        orderId: orderId,
      });
    }
    res.json(`Order ${orderId} created successfully!`);
  }

  async updateStatus(req: Request, res: Response) {
    Order.update(req.body.newStatus, { where: { id: req.params.id } })
      .then((num) => res.json(`${num} records updated!`))
      .catch((err) => res.status(400).json(err));
  }
}

export default OrdersController;
