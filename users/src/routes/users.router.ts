import express from "express";
import passport from "passport";
import UsersController from "../controllers/users.controller";
import { validateNewUser, validateDelUser } from "../services/validator";

export const router = express.Router();

const users: UsersController = new UsersController();

router.use(express.json());

router.get("/all", users.getAllUsers);

router.post("/signup", validateNewUser, users.signUp);

router.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  users.logIn
);

router.post("/logout", users.logOut);

router.get("/profile", users.isLoggedIn, users.profile);

router.post("/changePass", users.isLoggedIn, users.changePassword);

router.delete("/", validateDelUser, users.delete);
