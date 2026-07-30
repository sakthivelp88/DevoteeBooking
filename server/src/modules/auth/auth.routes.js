import express from "express";

import { register, login, logout, me } from "./auth.controller.js";
import { auth } from "./auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.post("/logout", logout);

export default router;
