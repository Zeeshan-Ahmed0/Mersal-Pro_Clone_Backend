import { enums } from "../Utils/enums";

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
      type: DataTypes.ENUMS(enums.DIRECT, enums.INDIRECT),
      defaultValue: "Direct",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: enums.PENDING,
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
