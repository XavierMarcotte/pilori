import User from "../models/User.js";
import client from "../database.js";
import bcrypt from "bcrypt";

const userController = {
  profil: async function (req, res) {
    try {
      const user = await User.read(req.session.userId);
      const userId = req.session.userId;
      const websiteQuery = `SELECT *, (SELECT COUNT(*) FROM "comment" WHERE "website_id" = "website"."id") AS total_comments FROM "website" WHERE user_id = $1`;
      const websiteResult = await client.query(websiteQuery, [userId]);
      const commentQuery = `SELECT * FROM "comment" INNER JOIN "user" ON "comment".user_id = "user".id WHERE user_id = $1`;
      const commentResult = await client.query(commentQuery, [userId]);
      res.render("profil", {
        user: user,
        websites: websiteResult.rows,
        comments: commentResult.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },
  updateProfil: async function (req, res) {
    try {
      // console.log(req.body.password);
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.hash = hash;
      req.body.id = req.session.userId;
      // console.log(req.body.hash);
      // console.log(req.body.pseudo);
      console.log(req.body);
      const userRead = new User({ ...req.body });
      await userRead.update();
      res.redirect("/profil");
    } catch (error) {
      console.error(error);
      res.redirect("/tomates");
    }
  },

  // updateProfil: async function (req, res) {
  //   try {
  //     const previouspassword = await bcrypt.hash(req.body.previouspassword, 10);
  //     const userId = req.session.userId;
  //     const selectPassword = `SELECT * FROM "user" WHERE id = $1`;
  //     const resultPassword = await client.query(selectPassword, [userId]);
  //     if (resultPassword.rows.length > 0) {
  //       const user = resultPassword.rows[0];
  //       const hashMatch = await bcrypt.compare(
  //         req.body.previouspassword,
  //         user.hash
  //       );

  //       if (hashMatch) {
  //         const userRead = new User({ ...req.body });
  //         await userRead.update();
  //         res.redirect("/profil");
  //       } else {
  //         console.log("Mauvais mot de passe précédent");
  //         res.redirect("/profil");
  //         console.log(req.body.previouspassword);
  //         console.log(req.body.password);
  //         console.log(previouspassword);
  //         console.log(resultPassword.rows[0].hash);
  //       }
  //     } else {
  //       console.log("Utilisateur non trouvé");
  //       res.redirect("/profil");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.redirect("/tomates");
  //   }
  // },
};

export default userController;
