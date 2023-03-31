import { Request, Response } from "express";

import { Address } from "../models/address";

class AdressesController {
  async getAll(_req: Request, res: Response) {
    const adresses = await Address.findAll();
    res.json(adresses);
  }

  async getAddress(req: Request, res: Response) {
    const address = await Address.findOne({
      where: { id: req.params.id },
    }).catch((err) =>
      res.status(500).json({
        message: err.message || "There was an error!",
      })
    );

    if (address) {
      res.json(address);
    } else {
      res
        .status(404)
        .json(`Address with id: ${req.params.id} couldn't be found!`);
    }
  }

  async createAddress(req: Request, res: Response) {
    Address.create(req.body)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(500).json({
          message: err.message || "There was an error!",
        })
      );
  }

  async updateAddress(req: Request, res: Response) {
    Address.update(req.body, { where: { id: req.params.id } })
      .then((num) => res.json(`${num} records updated!`))
      .catch((err) => res.status(500).json(err));
  }

  async deleteAddress(req: Request, res: Response) {
    Address.destroy({ where: { id: req.params.id } })
      .then((num) => res.json(`${num} records deleted!`))
      .catch((err) => res.status(500).json(err));
  }
}

export default AdressesController;
