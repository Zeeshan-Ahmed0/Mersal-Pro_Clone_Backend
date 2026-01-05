import { enums } from "../Utils/enums";

export const Addresses = (sequelize: any, DataTypes: any) => {
  return sequelize.define("addresses", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUMS(enums.PICKUP, enums.DELIVERY),
      defaultValue: enums.PICKUP,
    },
    address: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    landmark: {
      type: DataTypes.STRING,
    },
    building: {
      type: DataTypes.STRING,
    },
  });
};
