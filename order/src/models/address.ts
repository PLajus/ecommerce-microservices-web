import { DataTypes } from "sequelize";
import { sequelize } from "../services/database";

export const Address = sequelize.define("addresses", {
  type: {
    type: DataTypes.ENUM("Shipping", "Billing"),
    defaultValue: "Shipping",
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Addresses table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create addresses table: ", error);
  });
