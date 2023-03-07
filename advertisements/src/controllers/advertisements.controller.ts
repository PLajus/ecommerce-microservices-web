import "dotenv/config";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { client } from "../services/cassandra.client";

class AdvertisementsController {
  async getAllAds(_req: Request, res: Response) {
    const query = "SELECT * FROM advertisement";

    client.execute(query).then((result) => {
      res.json(result.rows);
    });
  }

  async getAd(req: Request, res: Response) {
    const query = "SELECT * FROM advertisement WHERE id = ?";

    client.execute(query, [req.params.id], (err, result) => {
      if (err) {
        res.status(400).json(`There was an error getting ad ${req.params.id}`);
      } else {
        res.json(result.rows[0]);
      }
    });
  }

  async createAd(req: Request, res: Response) {
    const query = `INSERT INTO advertisement 
      (id, name, description, createdAt, updatedAt, expiresAt, showncount) 
      VALUES (?,?,?,?,?,?,?)`;

    const date = new Date();

    const params = [
      uuidv4(),
      req.body.name,
      req.body.description,
      date.toISOString,
      date.toISOString,
      new Date(date.setMonth(date.getMonth() + 1)).toISOString,
      // req.body.expires,
      0,
    ];

    client.execute(query, params, { prepare: true }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not create ad!`);
      } else {
        res.json("Advertisement created!");
      }
    });
  }

  async updateAdDesc(req: Request, res: Response) {
    const query = `UPDATE advertisement SET
      description = ?
      WHERE id = ?`;

    const params = [req.body.description, req.params.id];
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
    const query = `UPDATE advertisement SET
      name = ?
      WHERE id = ?`;
    const params = [req.body.name, req.params.id];

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
    const query = `UPDATE advertisement SET
      showncount = ?
      WHERE id = ?`;

    const params = [req.body.shownCount, req.params.id];

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
    const query = `UPDATE advertisement SET
      expires = ?
      WHERE id = ?`;

    const params = [req.body.expires, req.params.id];

    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not update ad!`);
      } else {
        res.json("Advertisement expiration date updated!");
      }
    });
  }

  async daleteAd(req: Request, res: Response) {
    const query = `DELETE FROM advertisement
      WHERE id = ? IF EXISTS`;

    client.execute(query, [req.params.id], { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not delete ad ${req.params.id}!`);
      } else {
        res.json(`Ad deleted!`);
      }
    });
  }
}

export default AdvertisementsController;
