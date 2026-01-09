import { sequelize } from "../Config/dbConfig.ts";
import { db } from "../Models/index.ts";
import {
  insertEmployeeIdinTimeline,
  validateUpdateBooking,
} from "../Services/bookingService.ts";
import { enums } from "../Utils/enums.ts";
import { sendSuccess, sendError } from "./../Utils/helpers.ts";
import { createTimeline } from "./../Utils/timelines.ts";

export const getBookingDetail = async (req: any, res: any) => {
  try {
    const employeeId = req.query.id;

    const booking = await db.Bookings.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Addresses,
          where: { type: "Pickup" },
          attributes: [
            "address",
            "latitude",
            "longitude",
            "landmark",
            "building",
          ],
          as: "pickup",
        },
        {
          model: db.Addresses,
          where: { type: "Delivery" },
          attributes: [
            "address",
            "latitude",
            "longitude",
            "landmark",
            "building",
          ],
          as: "delivery",
        },
        {
          model: db.Timelines,
          as: "timeline",
          attributes: [
            "label",
            "completedAt",
            "status",
            "employeeType",
            "employeeId",
          ],
          where: { isImportant: true, ...(employeeId && { employeeId }) },
        },
      ],
    });
    sendSuccess(res, booking);
  } catch (error) {
    sendError(res, error);
  }
};

export const getAllBookings = async (req: any, res: any) => {
  try {
    const bookings = await db.Bookings.findAll();
    sendSuccess(res, bookings);
  } catch (error) {
    sendError(res, error);
  }
};

export const createBooking = async (req: any, res: any) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      userId,
      type,
      deliveryMode,
      senderName,
      senderPhone,
      senderEmail,
      receiverName,
      receiverPhone,
      receiverEmail,
      paymentMethod,
      paymentStatus,
      parcelAmount,
      pickup_address,
      pickup_lat,
      pickup_long,
      delivery_address,
      delivery_lat,
      delivery_long,
      droppoint1Id,
      droppoint2Id,
    } = req.body;

    const deliveryFee = type == "Direct" ? 1000 : 3000;
    const vat = (parcelAmount / 100) * 5;
    const total = parcelAmount + deliveryFee + vat;

    const booking = await db.Bookings.create(
      {
        userId,
        type,
        deliveryMode,
        senderName,
        senderPhone,
        senderEmail,
        receiverName,
        receiverPhone,
        receiverEmail,
        paymentMethod,
        paymentStatus,
        parcelAmount,
        deliveryFee,
        vat,
        total,
      },
      { transaction }
    );

    const pickup = await db.Addresses.create(
      {
        type: enums.PICKUP,
        address: pickup_address,
        latitude: pickup_lat,
        longitude: pickup_long,
        bookingId: booking.id,
      },
      { transaction }
    );

    const delivery = await db.Addresses.create(
      {
        type: enums.DELIVERY,
        address: delivery_address,
        latitude: delivery_lat,
        longitude: delivery_long,
        bookingId: booking.id,
      },
      { transaction }
    );

    const staticTimeline = createTimeline(deliveryMode, booking.id);

    const timeline = await db.Timelines.bulkCreate(staticTimeline, {
      transaction,
    });

    if (type == enums.INDIRECT) {
      const dpk1Id = await insertEmployeeIdinTimeline(
        booking.id,
        droppoint1Id,
        pickup_lat,
        pickup_long,
        transaction,
        enums.DROPPOINT_KEEPER_1
      );

      const dpk1 = await db.Employees.findOne({ where: { id: dpk1Id } });

      await insertEmployeeIdinTimeline(
        booking.id,
        undefined,
        dpk1.latitude,
        dpk1.longitude,
        transaction,
        enums.WAREHOUSE_KEEPER
      );

      await insertEmployeeIdinTimeline(
        booking.id,
        droppoint2Id,
        delivery_lat,
        delivery_long,
        transaction,
        enums.DROPPOINT_KEEPER_2
      );
    }

    await transaction.commit();

    sendSuccess(res, [booking, pickup, delivery, timeline]);
  } catch (error) {
    await transaction.rollback();
    sendError(res, error);
  }
};

export const updateBooking = async (req: any, res: any) => {
  const transaction = await sequelize.transaction();
  const bookingId = req.params.id;
  try {
    const { status, employeeId, isAdmin, role } = req.body;
    const booking = await db.Bookings.findOne({ where: { id: bookingId } });
    const timeline = await db.Bookings.findAll({ where: { bookingId } });
    const employee = await db.Employees.findOne({ where: { id: employeeId } });

    validateUpdateBooking(booking, timeline, status, employee, isAdmin);

    if (isAdmin && employeeId) {
      booking.status = enums.ASSIGNED;
    }

    await db.Timelines.udpate(
      {
        status: enums.COMPLETED,
        employeeId,
        completedAt: Date.now(),
      },
      {
        where: {
          bookingId,
          role,
        },
      }
    );

    sendSuccess(res);
  } catch (error) {
    sendError(res, error);
  }
};
