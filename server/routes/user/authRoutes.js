import express from "express";

import {register, login, logout, me} from "#controllers/user/authController.js";

import { auth } from "#middleware/user/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", auth, me);

router.post("/logout", logout);

export default router;