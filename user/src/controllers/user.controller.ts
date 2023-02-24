import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { UserDoc } from "../models/IUser";
import passport from "passport";
import jwt from "jsonwebtoken";

export default class UserController {
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

  logIn(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email) {
      res.json({ success: false, message: "Email was not given" });
    }
    if (!req.body.password) {
      res.json({ success: false, message: "Password was not given" });
    } else {
      passport.authenticate(
        "local",
        function (err: any, user: UserDoc, info: any) {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            if (!user) {
              res.json({
                success: false,
                message: "Incorrect email or password",
              });
            } else {
              const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.SECRET!,
                { expiresIn: "24h" }
              );
              res.json({
                success: true,
                message: "Authentication successful",
                token: token,
              });
            }
          }
        }
      )(req, res, next);
    }
  }

  logOut(req: Request, res: Response, next: NextFunction) {
    req.logout(function (err: any) {
      if (err) {
        return next(err);
      }
      res.json("You have logged out!");
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
      message: "You made it to the secure route",
      user: req.user,
      token: req.query.secret_token,
    });
  }
}
