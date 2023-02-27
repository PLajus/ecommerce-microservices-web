import express from "express";
import passport from "passport";
import UserController from "../controllers/user.controller";

export const router = express.Router();

const user: UserController = new UserController();

router.use(express.json());

router.get("/", user.main);

router.post("/signup", user.signUp);

router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  user.logIn
);

router.post("/logout", user.logOut);

router.get("/profile", user.isLoggedIn, user.profile);

router.post("/changePass", user.isLoggedIn, user.changePassword);
