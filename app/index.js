import express from "express";
import session from "express-session";
import * as dotenv from "dotenv";
import router from "./router.js";
import addUserData from "./middlewares/addUserData.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
// import csurf from "csurf";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

// app.use(csurf);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(methodOverride("_method"));

app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "testpilori",
  })
);

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use(addUserData);

app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
