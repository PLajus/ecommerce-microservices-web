import express from "express";
import passport from "passport";
import UserController from "../controllers/user.controller";

export const router = express.Router();

const user: UserController = new UserController();

router.use(express.json());

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  user.signUp
);
