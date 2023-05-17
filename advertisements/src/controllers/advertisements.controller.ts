import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { client } from "../services/cassandra.client";

class AdvertisementsController {
  async getAll(_req: Request, res: Response) {
    const query = "SELECT * FROM advertisements";

    client.execute(query).then((result) => {
      res.json(result.rows);
    });
  }

  async getAd(req: Request, res: Response) {
    const query = "SELECT * FROM advertisements WHERE id = ?";

    client.execute(query, [req.params.id], (err, result) => {
      if (err) {
        res.status(400).json(`There was an error!`);
      } else {
        res.json(result.rows[0]);
      }
    });
  }

  async createAd(req: Request, res: Response) {
    const query = `INSERT INTO advertisements 
      (id, name, description, createdAt, updatedAt, expiresAt, shownCount) 
      VALUES (?,?,?,?,?,?,?)`;

    const date = new Date();

    const params = [
      uuidv4(),
      req.body.name,
      req.body.description,
      date.toISOString(),
      date.toISOString(),
      req.body.expires
        ? req.body.expires
        : new Date(date.setMonth(date.getMonth() + 1)).toISOString(),
      req.body.shownCount ? req.body.shownCount : 0,
    ];

    client.execute(query, params, { prepare: true }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not create ad!`);
      } else {
        res.json(`Advertisement created ${result.rows}!`);
      }
    });
  }

  async updateAdDesc(req: Request, res: Response) {
    const query = `UPDATE advertisements SET
      description = ?, updatedAt = ?
      WHERE id = ?`;

    const params = [
      req.body.description,
      new Date().toISOString(),
      req.params.id,
    ];
    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not update ad!`);
      } else {
        res.json("Advertisement description updated!");
      }
    });
  }

  async updateAdName(req: Request, res: Response) {
    const query = `UPDATE advertisements SET
      name = ?, updatedAt = ?
      WHERE id = ?`;
    const params = [req.body.name, new Date().toISOString(), req.params.id];

    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not update ad!`);
      } else {
        res.json("Advertisement name updated!");
      }
    });
  }

  async updateAdShowCount(req: Request, res: Response) {
    const query = `UPDATE advertisements SET
      shownCount = ?, updatedAt = ?
      WHERE id = ?`;

    const params = [
      req.body.shownCount,
      new Date().toISOString(),
      req.params.id,
    ];

    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not update ad!`);
      } else {
        res.json("Advertisement show count updated!");
      }
    });
  }

  async updateAdExpiration(req: Request, res: Response) {
    const query = `UPDATE advertisements SET
      expiresAt = ?, updatedAt = ?
      WHERE id = ?`;

    const params = [req.body.expires, new Date().toISOString(), req.params.id];

    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not update ad!`);
      } else {
        res.json("Advertisement expiration date updated!");
      }
    });
  }

  async deleteAd(req: Request, res: Response) {
    const query = `DELETE FROM advertisements
      WHERE id = ? IF EXISTS`;

    client.execute(query, [req.params.id], { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not delete ad!`);
      } else {
        res.json(`Ad deleted!`);
      }
    });
  }
}

export default AdvertisementsController;
