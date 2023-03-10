import "dotenv/config";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { client } from "../services/cassandra.client";

class UserLogsController {
  async getAll(_req: Request, res: Response) {
    const query = "SELECT * FROM logs";

    client.execute(query).then((result) => {
      res.json(result.rows);
    });
  }

  async getLog(req: Request, res: Response) {
    const query = "SELECT * FROM logs WHERE id = ?";

    client.execute(
      query,
      [req.params.id],
      { prepare: true },
      (err: any, result: any) => {
        if (err) {
          console.log(err);
          res
            .status(400)
            .json(`There was an error getting log ${req.params.id} logs`);
        } else {
          res.json(result.rows);
        }
      }
    );
  }

  async getUsersLogs(req: Request, res: Response) {
    const query = "SELECT * FROM logs WHERE user = ?";

    client.execute(
      query,
      [req.params.user],
      { prepare: true },
      (err: any, result: any) => {
        if (err) {
          console.log(err);
          res
            .status(400)
            .json(`There was an error getting users ${req.params.user} logs`);
        } else {
          res.json(result.rows);
        }
      }
    );
  }

  async createLog(req: Request, res: Response) {
    const query = `INSERT INTO logs 
      (id, user, createdAt, request, params) 
      VALUES (?,?,?,?,?)`;

    const params = [
      uuidv4(),
      req.body.user,
      new Date(),
      req.body.request,
      req.body.params,
    ];

    client.execute(query, params, { prepare: true }, (err, _result) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not create log!`);
      } else {
        res.json("Log created!");
      }
    });
  }

  async updateLogRequest(req: Request, res: Response) {
    const query = `UPDATE logs SET
      request = ?
      WHERE id = ?`;

    const params = [req.body.request, req.params.id];

    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not update log!`);
      } else {
        res.json("Log request updated!");
      }
    });
  }

  async daleteLog(req: Request, res: Response) {
    const query = `DELETE FROM logs
      WHERE id = ? IF EXISTS`;

    client.execute(query, [req.params.id], { prepare: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json(`Could not delete log ${req.params.id}!`);
      } else {
        res.json(`Log ${req.params.iq} deleted!`);
      }
    });
  }
}

export default UserLogsController;
