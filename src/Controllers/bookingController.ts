import { db } from "../Models";
import { sendSuccess, sendError } from "./../Utils/helpers.ts";

export const getBooking = async (req: any, res: any) => {
  try {
    const booking = db.Bookings.findOne({ where: { id: req.params.id } });
    sendSuccess(res, booking);
  } catch (error) {
    sendError(res, error);
  }
};

export const getAllBookings = async (req: any, res: any) => {
  try {
    const bookings = db.Bookings.findAll();
    sendSuccess(res, bookings);
  } catch (error) {
    sendError(res, error);
  }
};

export const createBooking = async (req: any, res: any) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      status,
      address,
      latitude,
      longitude,
    } = req.body;
    const booking = db.Bookings.create({
      name,
      email,
      password,
      phone,
      role,
      status,
      address,
      latitude,
      longitude,
    });
    sendSuccess(res, booking);
  } catch (error) {
    sendError(res, error);
  }
};

export const updateBooking = async (req: any, res: any) => {
  try {
    const booking = db.Bookings.findOne({ where: { id: req.params.id } });
    sendSuccess(res, booking);
  } catch (error) {
    sendError(res, error);
  }
};