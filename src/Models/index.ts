import { DataTypes, Sequelize } from "sequelize";
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

db.Users.hasMany(db.Bookings, { foreignKey: "userId" });
db.Bookings.belongsTo(db.Users, { foreignKey: "userId" });

db.Bookings.hasOne(db.Addresses, { foreignKey: "bookingId", as: "pickup" });

db.Bookings.hasOne(db.Addresses, { foreignKey: "bookingId", as: "delivery" });

db.Bookings.hasMany(db.Timelines, {foreignKey: "bookingId", as: "timeline", onDelete: "CASCADE"})
// db.Timelines.belongsTo(db.Bookings, {foreignKey: "bookingId", as: "booking"})

db.sequelize = Sequelize;

export { db };
