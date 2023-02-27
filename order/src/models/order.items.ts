import { DataTypes } from "sequelize";
import { sequelize } from "../services/database";

export const OrderItems = sequelize.define("order_items", {
  itemId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemAmount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("order_items table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create order_items table: ", error);
  });
