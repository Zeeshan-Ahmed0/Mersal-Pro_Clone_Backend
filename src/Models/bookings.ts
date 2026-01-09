import { enums } from "../Utils/enums.ts";

export const Bookings = (sequelize: any, DataTypes: any) => {
  return sequelize.define("bookings", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(enums.DIRECT, enums.INDIRECT),
      defaultValue: "Direct",
    },
    deliveryMode: {
      type: DataTypes.ENUM(
        enums.DIRECT,
        enums.DOOR_TO_DOOR,
        enums.DOOR_TO_DROPPOINT,
        enums.DROPPOINT_TO_DROPPOINT,
        enums.DROPPOINT_TO_DOOR
      ),
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: enums.UNASSIGNED,
    },
    senderName: {
      type: DataTypes.STRING,
    },
    senderPhone: {
      type: DataTypes.STRING,
    },
    senderEmail: {
      type: DataTypes.STRING,
    },
    receiverName: {
      type: DataTypes.STRING,
    },
    receiverPhone: {
      type: DataTypes.STRING,
    },
    receiverEmail: {
      type: DataTypes.STRING,
    },
    paymentMethod: {
      type: DataTypes.ENUM(enums.COD, enums.ONLINE),
    },
    paymentStatus: {
      type: DataTypes.ENUM(enums.PENDING, enums.DEPOSITED, enums.SETTLED),
      defaultValue: enums.PENDING,
    },
    verificationCode: {
      type: DataTypes.STRING,
    },
    verifiedAt: {
      type: DataTypes.DATE,
    },
    photo: {
      type: DataTypes.STRING,
    },
    parcelAmount: {
      type: DataTypes.INTEGER,
    },
    deliveryFee: {
      type: DataTypes.INTEGER,
    },
    vat: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.INTEGER,
    },
  });
};
