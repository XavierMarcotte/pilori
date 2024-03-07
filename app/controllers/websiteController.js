import Website from "../models/Website.js";
import client from "../database.js";
import fs from "fs";

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

  form: function (req, res) {
    res.render("add-site");
    console.log(req.session.userId);
  },

  formAction: async function (req, res) {
    try {
      const user_id = req.session.userId;
      const image = req.file.filename;
      const website = new Website({ ...req.body, user_id, image });
      await website.create();
      res.redirect("/tomates/" + website.slug);
    } catch (error) {
      res.render("add-site", {
        message: error.message,
      });
    }
  },

  create: async function (req, res) {
    try {
      const website = new Website(req.body);
      await website.create();
      res.json({
        title: website.title,
        description: website.description,
        address: website.address,
        level: website.level,
        device: website.device,
        id: website.id,
        slug: website.slug,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  },

  details: async function (req, res, next) {
    try {
      const { slug } = req.params;
      const result = await client.query(
        "SELECT * FROM website WHERE slug = $1",
        [slug]
      );
      const websiteQuery = `SELECT * FROM website WHERE slug = $1`;
      const websiteResult = await client.query(websiteQuery, [slug]);
      const websiteId = websiteResult.rows[0].id;
      const commentQuery = `SELECT * FROM comment WHERE website_id = $1`;
      const commentResult = await client.query(commentQuery, [websiteId]);
      if (result.rowCount > 0) {
        res.render("detail", {
          website: result.rows[0],
          comments: commentResult.rows,
        });
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  allJson: async function (req, res) {
    try {
      const result = await client.query("SELECT * FROM website");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Le serveur a rencontré un problème.",
      });
    }
  },

  detailsJson: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await client.query("SELECT * FROM website WHERE id = $1", [
        id,
      ]);
      if (result.rowCount > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({
          message: "Le site demandé n'existe pas.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Le serveur a rencontré un problème.",
      });
    }
  },

  delete: async function (req, res) {
    try {
      const { id } = req.params;
      const website = await Website.read(id);
      const result = await website.delete();
      if (result.rowCount > 0) {
        res.json({
          message: "website supprimé",
        });
      } else {
        res.status(404).json({
          message: "Le site demandé n'existe pas.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Le serveur a rencontré un problème.",
      });
    }
  },

  update: async function (req, res) {
    try {
      const { id } = req.params;
      const website = await Website.read(id);
      if (req.body.title) {
        website.title = req.body.title;
      }
      if (req.body.description) {
        website.description = req.body.description;
      }
      if (req.body.address) {
        website.address = req.body.address;
      }
      if (req.body.level) {
        website.level = req.body.level;
      }
      if (req.body.device) {
        website.device = req.body.device;
      }
      await website.update();
      res.json({
        title: website.title,
        description: website.description,
        address: website.address,
        level: website.level,
        device: website.device,
        id: website.id,
        slug: website.slug,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default websiteController;
