import { enums } from "../Utils/enums.ts";

export const Timelines = (sequelize: any, DataTypes: any) => {
  return sequelize.define(
    "timelines",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: DataTypes.STRING,
        defaultValue: "Assigned",
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.INTEGER,
      },
      employeeType: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(enums.PENDING, enums.ACTIVE, enums.COMPLETED),
        allowNull: false,
        defaultValue: enums.PENDING,
      },
      isImportant: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      completedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    { timestamps: false }
  );
};
