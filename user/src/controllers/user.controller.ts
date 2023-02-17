import { Request, Response } from "express";

export default class UserController {
  async signUp(req: Request, res: Response) {
    res.json({
      message: "Signup successful!",
      user: req.user,
    });
  }
}
