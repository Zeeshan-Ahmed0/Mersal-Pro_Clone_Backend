import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingDetail,
  updateBooking,
} from "../Controllers/bookingController.ts";

const router = express.Router();

router.get("/get/:id", getBookingDetail);
router.get("/get-all", getAllBookings);
router.post("/create", createBooking);
router.put("/update/:id", updateBooking);

export default router;
