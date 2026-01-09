import { enums } from "./enums.ts";

export interface Timeline {
  label: string;
  employeeType: string;
  bookingId: number;
  role: string;
  isImportant?: boolean;
}

type Step = Omit<Timeline, "bookingId">;

const DIRECT_DELIVERY: Step[] = [
  { label: enums.ASSIGNED, role: enums.RIDER, employeeType: enums.RIDER },
  { label: enums.PICKUP, role: enums.RIDER, employeeType: enums.RIDER },
  { label: enums.IN_TRANSIT, role: enums.RIDER, employeeType: enums.RIDER },
  { label: enums.DELIVERED, role: enums.RIDER, employeeType: enums.RIDER },
];

const RIDER_START: Step[] = [
  { label: enums.ASSIGNED, role: enums.RIDER, employeeType: enums.RIDER },
  { label: enums.PICKUP, role: enums.RIDER, employeeType: enums.RIDER },
  {
    label: enums.IN_TRANSIT,
    role: enums.RIDER,
    employeeType: enums.RIDER,
    isImportant: false,
  },
  {
    label: enums.DELIVERED_TO_DROPPOINT,
    role: enums.RIDER,
    employeeType: enums.RIDER,
    isImportant: false,
  },
];

const DROPPOINT_WAREHOUSE_CYCLE: Step[] = [
  {
    label: enums.ARRIVED_AT_DROPPOINT_1,
    role: enums.DROPPOINT_KEEPER_1,
    employeeType: enums.DROPPOINT_KEEPER,
  },
  {
    label: enums.DISPATCHED_TO_WAREHOUSE,
    role: enums.DROPPOINT_KEEPER_1,
    employeeType: enums.DROPPOINT_KEEPER,
  },

  {
    label: enums.PICKUP_FROM_DROPPOINT,
    role: enums.CAR_DRIVER_1,
    employeeType: enums.CAR_DRIVER,
    isImportant: false,
  },
  {
    label: enums.IN_TRANSIT_TO_WAREHOUSE,
    role: enums.CAR_DRIVER_1,
    employeeType: enums.CAR_DRIVER,
    isImportant: false,
  },
  {
    label: enums.DELIVERED_TO_WAREHOUSE,
    role: enums.CAR_DRIVER_1,
    employeeType: enums.CAR_DRIVER,
    isImportant: false,
  },

  {
    label: enums.ARRIVED_AT_WAREHOUSE,
    role: enums.WAREHOUSE_KEEPER,
    employeeType: enums.WAREHOUSE_KEEPER,
  },
  {
    label: enums.DISPATCHED_TO_DROPPOINT_2,
    role: enums.WAREHOUSE_KEEPER,
    employeeType: enums.WAREHOUSE_KEEPER,
  },

  {
    label: enums.PICKUP_FROM_WAREHOUSE,
    role: enums.CAR_DRIVER_2,
    employeeType: enums.CAR_DRIVER,
    isImportant: false,
  },
  {
    label: enums.IN_TRANSIT_TO_DROPPOINT,
    role: enums.CAR_DRIVER_2,
    employeeType: enums.CAR_DRIVER,
    isImportant: false,
  },
  {
    label: enums.DELIVERED_TO_DROPPOINT,
    role: enums.CAR_DRIVER_2,
    employeeType: enums.CAR_DRIVER,
    isImportant: false,
  },

  {
    label: enums.ARRIVED_AT_DROPPOINT_2,
    role: enums.DROPPOINT_KEEPER_2,
    employeeType: enums.DROPPOINT_KEEPER,
  },
];

const DROPPOINT_TO_CUSTOMER: Step[] = [
  {
    label: enums.DISPATCHED_TO_CUSTOMER,
    role: enums.DROPPOINT_KEEPER_2,
    employeeType: enums.DROPPOINT_KEEPER,
    isImportant: false,
  },
  {
    label: enums.PICKUP_FROM_DROPPOINT,
    role: enums.CAR_DRIVER_3,
    employeeType: enums.CAR_DRIVER,
    isImportant: false,
  },
  {
    label: enums.IN_TRANSIT_TO_CUSTOMER,
    role: enums.CAR_DRIVER_3,
    employeeType: enums.CAR_DRIVER,
  },
  { label: enums.DELIVERED, role: enums.CAR_DRIVER_3, employeeType: enums.CAR_DRIVER },
];

const RECEIVED_AT_DROPPOINT: Step[] = [
  {
    label: enums.RECEIVED_BY_CUSTOMER,
    role: enums.DROPPOINT_KEEPER_2,
    employeeType: enums.DROPPOINT_KEEPER,
  },
];

const buildTimeline = (bookingId: number, steps: Step[]): Timeline[] =>
  steps.map((step) => ({ ...step, bookingId }));

export const createTimeline = (deliveryMode: string, bookingId: number) => {
  if (deliveryMode == enums.DIRECT) {
    return buildTimeline(bookingId, [...DIRECT_DELIVERY]);
  } else if (deliveryMode == enums.DOOR_TO_DOOR) {
    return buildTimeline(bookingId, [
      ...RIDER_START,
      ...DROPPOINT_WAREHOUSE_CYCLE,
      ...DROPPOINT_TO_CUSTOMER,
    ]);
  } else if (deliveryMode == enums.DOOR_TO_DROPPOINT) {
    return buildTimeline(bookingId, [
      ...RIDER_START,
      ...DROPPOINT_WAREHOUSE_CYCLE,
      ...RECEIVED_AT_DROPPOINT,
    ]);
  } else if (deliveryMode == enums.DROPPOINT_TO_DOOR) {
    return buildTimeline(bookingId, [
      ...DROPPOINT_WAREHOUSE_CYCLE,
      ...DROPPOINT_TO_CUSTOMER,
    ]);
  } else if (deliveryMode == enums.DROPPOINT_TO_DROPPOINT) {
    return buildTimeline(bookingId, [
      ...DROPPOINT_WAREHOUSE_CYCLE,
      ...RECEIVED_AT_DROPPOINT,
    ]);
  } else
    throw new Error("Invalid deliveryMode given in timeline create function.");
};
