import { DataTypes } from "sequelize";
import { sequelize } from "../services/database";
import { Address as BillingAddress } from "./address";

export const Payment = sequelize.define("payments", {
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Paid", "Canceled"),
    defaultValue: "Pending",
    allowNull: false,
  },
});

Payment.belongsTo(BillingAddress);

sequelize
  .sync()
  .then(() => {
    console.log("Payments table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to payments table: ", error);
  });
