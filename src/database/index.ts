import { Sequelize } from "sequelize";

const sequelize = new Sequelize("earthquakes", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
