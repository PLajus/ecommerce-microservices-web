import { Request, Response } from "express";
import { Payment } from "../models/payment";

class PaymentsController {
  async getAll(_req: Request, res: Response) {
    const payments = await Payment.findAll();
    res.json(payments);
  }

  async getPayment(req: Request, res: Response) {
    const payment = await Payment.findOne({
      where: { id: req.params.id },
    });
    if (payment) {
      res.json(payment);
    } else {
      res
        .status(404)
        .json(`Payment with id: ${req.params.id} couldn't be found!`);
    }
  }

  async createPayment(req: Request, res: Response) {
    Payment.create(req.body.payment)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(400).json({
          status: "fail",
          message:
            err.message || "An error occurred while creating the payment.",
        })
      );
  }

  async updatePayment(req: Request, res: Response) {
    Payment.update(req.body.payment, { where: { id: req.params.id } })
      .then((num) => res.json(`${num} records updated!`))
      .catch((err) => res.status(400).json(err));
  }

  async deletePayment(req: Request, res: Response) {
    Payment.destroy({ where: { id: req.params.id } })
      .then((num) => res.json(`${num} records deleted!`))
      .catch((err) => res.status(400).json(err));
  }
}

export default PaymentsController;
