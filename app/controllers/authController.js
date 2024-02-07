import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import client from "../database.js";

const authController = {
  login: function (req, res) {
    res.render("login");
  },

  loginAction: async function (req, res) {
    try {
      const foundUser = await client.query(
        'SELECT * FROM "user" WHERE "email" = $1',
        [req.body.email]
      );
      if (foundUser.rowCount > 0) {
        const user = foundUser.rows[0];
        const result = await bcrypt.compare(req.body.password, user.hash);
        if (result) {
          req.session.isLogged = true;
          req.session.userId = user.id;
          res.redirect("/profil");
        } else {
          res.render("login", {
            alert: "Mauvais couple identifiant/mot de passe",
          });
        }
      } else {
        throw new Error("Mauvais couple identifiant/mot de passe");
      }
    } catch (error) {
      console.error(error);
      res.render("login", { alert: error.message });
    }
  },

  signup: function (req, res) {
    res.render("register");
  },

  signupAction: async function (req, res) {
    try {
      const options = {
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      };
      if (!validator.isStrongPassword(req.body.password, options)) {
        throw new Error(
          "Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
        );
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.hash = hash;
      const user = new User(req.body);
      await user.create();
      req.session.isLogged = true;
      req.session.userId = user.id;
      res.redirect("/profil");
    } catch (error) {
      console.error(error);
      res.render("register", { alert: error.message });
    }
  },

  logout: function (req, res) {
    req.session.destroy();
    res.redirect("/");
  },
};

export default authController;
