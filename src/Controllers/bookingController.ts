import { db } from "../Models/index.ts";
import { sendSuccess, sendError } from "./../Utils/helpers.ts";

export const getBooking = async (req: any, res: any) => {
  try {
    const booking= await db.Bookings.findOne({ where: { id: req.params.id } });
    sendSuccess(res, booking);
  } catch (error) {
    sendError(res, error);
  }
};

export const getAllBookings = async (req: any, res: any) => {
  try {
    const bookings= await db.Bookings.findAll();
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
    const booking= await db.Bookings.create({
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
    const booking= await db.Bookings.findOne({ where: { id: req.params.id } });
    sendSuccess(res, booking);
  } catch (error) {
    sendError(res, error);
  }
};