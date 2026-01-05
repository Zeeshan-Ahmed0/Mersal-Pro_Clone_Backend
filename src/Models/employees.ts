import { enums } from "../Utils/enums.ts";

export const Employees = (sequelize: any, DataTypes: any) => {
  return sequelize.define("employees", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.ENUM(
        enums.RIDER,
        enums.CAR_DRIVER,
        enums.DROPPOINT_KEEPER,
        enums.WAREHOUSE_KEEPER
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
    address: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longiitude: {
      type: DataTypes.STRING,
    },
  });
};
