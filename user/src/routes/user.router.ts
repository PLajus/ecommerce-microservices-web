import express from "express";
import UserController from "../controllers/user.controller";
import passport from "passport";

export const router = express.Router();

const user: UserController = new UserController();

router.use(express.json());

router.post("/signup", user.signUp);

router.post("/login", user.logIn);

router.post("/logout", user.logOut);

router.get("/profile", user.isLoggedIn, user.profile);
