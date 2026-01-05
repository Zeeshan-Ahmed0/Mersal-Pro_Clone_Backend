import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
} from "../Controllers/bookingController.ts";

const router = express.Router();

router.get("/get/:id", getBooking);
router.get("/get-all", getAllBookings);
router.post("/create", createBooking);
router.post("/update/:id", updateBooking);

export default router;
