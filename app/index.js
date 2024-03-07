import express from "express";
import session from "express-session";
import * as dotenv from "dotenv";
import router from "./router.js";
import addUserData from "./middlewares/addUserData.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "testpilori",
  })
);

app.use(addUserData);

app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
