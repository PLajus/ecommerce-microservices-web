import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export default class UserController {
  main(req_: Request, res: Response) {
    res.json({ msg: "user" });
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
    res.json({ success: true, message: "You have logged in!" });
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
}
