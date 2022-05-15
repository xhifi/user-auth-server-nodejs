import express from "express";
import { register, login, updateUser, deleteUser } from "../controllers/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/:id").post(login).patch(updateUser).delete(deleteUser);

export default router;
