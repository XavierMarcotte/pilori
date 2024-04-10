import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  host: "localhost",
  logging: false,
  define: {
    underscored: true,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données établie.");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données:", err);
  });

export default sequelize;
