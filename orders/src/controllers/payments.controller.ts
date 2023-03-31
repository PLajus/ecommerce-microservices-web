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
    }).catch((err) =>
      res.status(500).json({
        message: err.message || "There was an error!",
      })
    );

    if (payment) {
      res.json(payment);
    } else {
      res
        .status(404)
        .json(`Payment with id: ${req.params.id} couldn't be found!`);
    }
  }

  async createPayment(req: Request, res: Response) {
    Payment.create(req.body)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(500).json({
          message: err.message || "There was an error!",
        })
      );
  }

  async updatePayment(req: Request, res: Response) {
    Payment.update(req.body, { where: { id: req.params.id } })
      .then((num) => res.json(`${num} records updated!`))
      .catch((err) => res.status(500).json(err));
  }

  async deletePayment(req: Request, res: Response) {
    Payment.destroy({ where: { id: req.params.id } })
      .then((num) => res.json(`${num} records deleted!`))
      .catch((err) => res.status(500).json(err));
  }
}

export default PaymentsController;
