import { DataTypes } from "sequelize";

export const getColumns = () => ({
  id: { type: DataTypes.CHAR, allowNull: false, primaryKey: true },
  geometryLongitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
