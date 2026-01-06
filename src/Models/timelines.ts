import { enums } from "../Utils/enums.ts";

export const Timelines = (sequelize: any, DataTypes: any) => {
  return sequelize.define("timelines", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeType: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "Assignment",
    },
    status: {
      type: DataTypes.ENUM(enums.PENDING, enums.ACTIVE, enums.COMPLETED),
      allowNull: false,
      defaultValue: enums.PENDING,
    },
  });
};
