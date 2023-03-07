import { DataTypes } from "sequelize";
import { sequelize } from "../services/database";
import { OrderItems } from "./order.items";
import { Address as ShippingAddress } from "./address";
import { Payment } from "./payment";

export const Order = sequelize.define("orders", {
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("New", "Pending", "Hold", "Shipped", "Delivered"),
    defaultValue: "New",
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
});

Order.belongsTo(ShippingAddress);
Order.belongsTo(Payment);
Order.hasMany(OrderItems);

sequelize
  .sync()
  .then(() => {
    console.log("Orders table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create orders table: ", error);
  });
