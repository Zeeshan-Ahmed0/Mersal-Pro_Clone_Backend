import express from "express";
import {
  createEmployee,
  getEmployee,
  getAllEmployees,
} from "../Controllers/employeeController.ts";

const router = express.Router();

router.get("/get/:id", getEmployee);
router.get("/get-all", getAllEmployees);
router.post("/create", createEmployee);

export default router;
