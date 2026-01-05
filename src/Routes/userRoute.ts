import express from "express";
import { createUser, getUser } from "../Controllers/userController";

const router = express.Router();

router.get("/get/:id", getUser);
router.post("/create", createUser);

export const userRouter = router;
