import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    },
    display_name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false, 
  }
);

export default User;
