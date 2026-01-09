import { enums } from "./enums.ts";

export const timelineStatuses = [
  enums.ASSIGNED,
  enums.PICKUP,
  enums.IN_TRANSIT,
  enums.DELIVERED,
  enums.DELIVERED_TO_DROPPOINT,
  enums.ARRIVED_AT_DROPPOINT_1,
  enums.DISPATCHED_TO_WAREHOUSE,
  enums.PICKUP_FROM_DROPPOINT,
  enums.IN_TRANSIT_TO_WAREHOUSE,
  enums.DELIVERED_TO_WAREHOUSE,
  enums.ARRIVED_AT_WAREHOUSE,
  enums.DISPATCHED_TO_DROPPOINT_2,
  enums.PICKUP_FROM_WAREHOUSE,
  enums.IN_TRANSIT_TO_DROPPOINT,
  enums.DELIVERED_TO_DROPPOINT,
  enums.ARRIVED_AT_DROPPOINT_2,
  enums.DISPATCHED_TO_CUSTOMER,
  enums.RECEIVED_BY_CUSTOMER,
  enums.IN_TRANSIT_TO_CUSTOMER,
];

export const bookingStatuses = [
  enums.UNASSIGNED,
  enums.ASSIGNED,
  enums.PENDING,
  enums.IN_PROGRESS,
  enums.DELIVERED,
  enums.DEPOSITED,
  enums.SETTLED,
  enums.COMPLETED,
  enums.CANCELLED,
  enums.RETURNED,
];

export const employeeStatuses: any = {
  "Rider": [
    enums.PICKUP,
    enums.IN_TRANSIT,
    enums.DELIVERED,
    enums.DELIVERED_TO_DROPPOINT,
  ],

  "Droppoint Keeper": [
    enums.ARRIVED_AT_DROPPOINT_1,
    enums.DISPATCHED_TO_WAREHOUSE,
    enums.ARRIVED_AT_DROPPOINT_2,
    enums.DISPATCHED_TO_CUSTOMER,
    enums.RECEIVED_BY_CUSTOMER,
  ],

  "Warehouse Keeper": [
    enums.ARRIVED_AT_WAREHOUSE,
    enums.DISPATCHED_TO_DROPPOINT_2,
  ],

  "Car Driver": [
    enums.DELIVERED,
    enums.PICKUP_FROM_DROPPOINT,
    enums.IN_TRANSIT_TO_WAREHOUSE,
    enums.DELIVERED_TO_WAREHOUSE,
    enums.PICKUP_FROM_WAREHOUSE,
    enums.IN_TRANSIT_TO_DROPPOINT,
    enums.DELIVERED_TO_DROPPOINT,
    enums.IN_TRANSIT_TO_CUSTOMER,
  ],
};
