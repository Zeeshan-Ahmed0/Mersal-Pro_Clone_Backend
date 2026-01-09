import express from "express";
import { createUser, getUser } from "../Controllers/userController.ts";

const router = express.Router();

router.get("/get/:id", getUser);
router.post("/create", createUser);

export default router;
