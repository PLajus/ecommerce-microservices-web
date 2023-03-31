import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user";

export default class UsersController {
  async getAllUsers(_req: Request, res: Response) {
    const users = await User.find({});
    return res.json(users);
  }

  async getUser(req: Request, res: Response) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res
          .status(400)
          .json(`User with id: ${req.params.id} not found!`);
      }
      return res.json(user);
    }
    return res.status(400).json("Invalid ID");
  }

  signUp(req: Request, res: Response) {
    User.register(
      new User({ email: req.body.email }),
      req.body.password,
      (err, _user) => {
        if (err) {
          res.json({
            success: false,
            message: "There was an issue! Error: " + err,
          });
        } else {
          res.json({ success: true, message: "Account created!" });
        }
      }
    );
  }

  logIn(req: Request, res: Response) {
    if (req.isAuthenticated()) {
      res.json("You are already logged in.");
    } else {
      res.json({ success: true, message: "You have logged in!" });
    }
  }

  logOut(req: Request, res: Response, next: NextFunction) {
    req.logout(function (err: any) {
      if (err) {
        return next(err);
      } else {
        res.json("You have logged out!");
      }
    });
  }

  isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json("You are unauthorized.");
  }

  profile(req: Request, res: Response) {
    res.json({
      message: "Your profile information",
      user: req.user,
      token: req.query.secret_token,
    });
  }

  async updateStatus(req: Request, res: Response) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const result = await User.findByIdAndUpdate(req.params.id, req.body);

      return res.json(result);
    }
    return res.status(400).json("Invalid ID");
  }

  changePassword(req: Request, res: Response) {
    User.findOne({ _id: req.user?._id }, (err: any, user: any) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({ success: false, message: "User not found" });
        } else {
          user.changePassword(
            req.body.oldpassword,
            req.body.newpassword,
            function (err: any) {
              if (err) {
                if (err.name === "IncorrectPasswordError") {
                  res.json({ success: false, message: "Incorrect password" }); // Return error
                } else {
                  res.json({
                    success: false,
                    message: "Something went wrong!",
                  });
                }
              } else {
                res.json({
                  success: true,
                  message: "Your password has been changed successfully",
                });
              }
            }
          );
        }
      }
    });
  }

  delete(req: Request, res: Response) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      User.findByIdAndDelete(
        req.params.id,
        (err: mongoose.CallbackError, result: any) => {
          if (err) {
            res.status(400).json("Couldn't delete user");
          } else {
            res.json(result);
          }
        }
      );
    } else {
      return res.status(400).json("Invalid ID");
    }
  }
}
