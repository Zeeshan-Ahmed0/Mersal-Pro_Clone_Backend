import { db } from "../Models/index.ts";
import { enums } from "../Utils/enums.ts";
import { sequelize } from "../Config/dbConfig.ts";
import { employeeStatuses, timelineStatuses } from "../Utils/statuses.ts";

export const getNearestDroppointId = async (
  target_lat: string,
  target_long: string,
  role: string
) => {
  const employee = await db.Employees.findOne({
    where: { role },
    attributes: {
      include: [
        [
          sequelize.literal(`
            6371 * acos(
              cos(radians(${Number(target_lat)}))
              * cos(radians(latitude::double precision))
              * cos(radians(longitude::double precision) - radians(${Number(
                target_long
              )}))
              + sin(radians(${Number(target_lat)}))
              * sin(radians(latitude::double precision))
            )
          `),
          "distance",
        ],
      ],
    },
    order: [[sequelize.literal("distance"), "ASC"]],
    limit: 1,
  });

  if (!employee) {
    throw new Error(`No employee found for role ${role}`);
  }
  return employee.id;
};

export const insertEmployeeIdinTimeline = async (
  bookingId: string | number,
  givenId: string | number | undefined,
  target_lat: string,
  target_long: string,
  transaction: any,
  role: string
) => {
  const employeeType =
    role == enums.WAREHOUSE_KEEPER
      ? enums.WAREHOUSE_KEEPER
      : enums.DROPPOINT_KEEPER;

  const employeeId = givenId
    ? givenId
    : await getNearestDroppointId(target_lat, target_long, employeeType);

  await db.Timelines.update(
    {
      employeeId,
    },
    {
      where: {
        bookingId,
        role,
      },
      transaction,
    }
  );

  return employeeId;
};

export const validateUpdateBooking = (
  booking: any,
  timeline: any,
  status: string,
  employee: any,
  isAdmin: boolean
) => {
  const employeeRole = employee.role;
  if (!timelineStatuses.includes(status)) {
    throw new Error(`Invalid status. Valid statuses are ${timelineStatuses}`);
  }

  if (employee && !employeeStatuses[employeeRole].includes(status)) {
    throw new Error(
      `Invalid status. Valid statuses for this employee are ${employeeStatuses[employeeRole]}`
    );
  }

  if (isAdmin && status != enums.ASSIGNED) {
    throw new Error("Admin can only assign jobs to Riders");
  }

  const isStatusCompleted = timeline.some(
    (item: any) =>
      item.label == status &&
      item.status == enums.COMPLETED &&
      item.employeeId == employee.id
  );

  if (isStatusCompleted) {
    throw new Error("Status already Completed");
  }
};

export const getStatus = () => {
  
}