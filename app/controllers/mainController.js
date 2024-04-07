import client from "../database.js";

const mainController = {
  home: async function (req, res) {
    try {
      const websitesResult = await client.query(
        'SELECT *, (SELECT COUNT(*) FROM "comment" WHERE "website_id" = "website"."id") AS total_comments FROM "website" ORDER BY id DESC LIMIT 3'
      );
      res.render("home", {
        websites: websitesResult.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  legals: function (req, res) {
    res.render("mentions", {
      title: "Mentions légales",
    });
  },

  plan: function (req, res) {
    res.render("plan", {
      title: "Plan du site",
    });
  },

  contact: function (req, res) {
    res.render("contact", {
      title: "Contact",
    });
  },

  notFound: function (req, res) {
    res.status(404).render("error", {
      message: "La page demandée n'a pas été trouvée.",
    });
  },
};

export default mainController;
