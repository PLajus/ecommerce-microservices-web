import { DataTypes } from "sequelize";
import { sequelize } from "../services/database";

import { OrderItems } from "./order-items";
import { Address as ShippingAddress } from "./address";
import { Payment } from "./payment";

export const Order = sequelize.define(
  "orders",
  {
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
      type: DataTypes.STRING,
      defaultValue: "€1.0",
    },
  },
  { timestamps: true }
);

Order.belongsTo(ShippingAddress, {
  onDelete: "CASCADE",
});
Order.belongsTo(Payment, {
  onDelete: "CASCADE",
});
Order.hasMany(OrderItems, {
  onDelete: "CASCADE",
});

sequelize
  .sync()
  .then(() => {
    console.log("Orders table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create orders table: ", error);
  });
