import { DataTypes } from "sequelize";
import { sequelize } from "../Config/dbConfig.ts";
import { Users } from "./users.ts";
import { Employees } from "./employees.ts";
import { Timelines } from "./timelines.ts";
import { Addresses } from "./adresses.ts";
import { Bookings } from "./bookings.ts";

const db: any = {};

db.Users = Users(sequelize, DataTypes);
db.Employees = Employees(sequelize, DataTypes);
db.Timelines = Timelines(sequelize, DataTypes);
db.Addresses = Addresses(sequelize, DataTypes);
db.Bookings = Bookings(sequelize, DataTypes);

export { db };
