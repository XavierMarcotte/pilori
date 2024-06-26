import Website from "../models/Website.js";
import client from "../database.js";

const websiteController = {
  all: async function (req, res) {
    try {
      if (req.query.keywords) {
        const filteredWebsites = await client.query(
          "SELECT * FROM website WHERE title ILIKE $1",
          [`%${req.query.keywords}%`]
        );
        if (filteredWebsites.rowCount > 0) {
          res.render("list", {
            title: "Résultat de la recherche",
            websites: filteredWebsites.rows,
          });
        } else {
          res.render("list", {
            title: "Aucun résultat",
            websites: [],
          });
        }
      } else {
        const websites = await client.query(
          `SELECT *, (SELECT COUNT(*) FROM "comment" WHERE "website_id" = "website"."id") AS total_comments FROM "website" `
        );
        res.render("list", {
          title: "Toutes les tomates",
          websites: websites.rows,
        });
      }
    } catch (error) {
      res.status(500).render("error");
    }
  },

  form: async function (req, res) {
    const csrfToken = req.csrfToken();
    req.session.csrfToken = csrfToken;
    console.log(csrfToken);
    res.render("add-site", { csrfToken: req.csrfToken() });
    // res.render("add-site");
  },

  formAction: async function (req, res) {
    try {
      const user_id = req.session.userId;
      const image = req.file.filename;
      const website = new Website({ ...req.body, user_id, image });
      await website.create();
      const csrfToken = req.csrfToken();
      req.session.csrfToken = csrfToken;
      // console.log(csrfToken);
      // res.json({
      //   success: true,
      //   message: "Le site a été ajouté avec succès.",
      //   websiteSlug: website.slug,
      // });
      res.redirect("/tomates/" + website.slug);
      // console.log({ csrfToken: req.session.csrfToken });
    } catch (error) {
      // res.status(500).json({
      //   success: false,
      //   message: "Erreur lors de l'ajout du site.",
      //   error: error.message,
      // });
      res.render("add-site", {
        message: error.message,
        // csrfToken: req.session.csrfToken,
      });
    }
  },

  deleteWebsite: async function (req, res) {
    try {
      const { slug } = req.params;
      const result = await client.query(
        "SELECT * FROM website WHERE slug = $1",
        [slug]
      );
      const websiteId = result.rows[0].id;
      // console.log(websiteId);
      const website = await Website.read(websiteId);
      await website.delete();
      res.redirect("/profil");
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  details: async function (req, res, next) {
    try {
      const { slug } = req.params;
      const result = await client.query(
        `SELECT * FROM "website" WHERE slug = $1`,
        [slug]
      );
      const websiteId = result.rows[0].id;
      const commentQuery = `SELECT * FROM comment INNER JOIN "user" ON "comment".user_id = "user".id WHERE website_id = $1`;
      const commentResult = await client.query(commentQuery, [websiteId]);
      // const user = `SELECT * FROM "user" INNER JOIN website ON "user".id = website.user_id`;
      // console.log(user);
      // const resultUser = await client.query(user, [result.rows[0].user_id]);
      // console.log(req.session.userId);
      if (result.rowCount > 0) {
        res.render("detail", {
          website: result.rows[0],
          comments: commentResult.rows,
          user__id: req.session.userId,
        });
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },
};

export default websiteController;
