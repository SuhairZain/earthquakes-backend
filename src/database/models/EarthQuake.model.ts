import { DataTypes } from "sequelize";

export const getColumns = () => ({
  id: { type: DataTypes.CHAR, allowNull: false, primaryKey: true },
  geometryLongitude: {
    type: DataTypes.FLOAT,
  },
  sig: {
    type: DataTypes.INTEGER,
  },
  magnitude: {
    type: DataTypes.INTEGER,
  },
  time: {
    type: DataTypes.TIME,
  },
  title: {
    type: DataTypes.STRING,
  },
});
