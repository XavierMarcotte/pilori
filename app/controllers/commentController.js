import client from "../database.js";
import Comment from "../models/Comment.js";

const commentController = {
  formComment: async function (req, res) {
    try {
      const { slug } = req.params;
      res.render("comment-form", { slug: slug });
    } catch (error) {
      console.error(error);
      res.render("comment-form", {
        message: "Une erreur s'est produite lors du chargement du formulaire",
      });
    }
  },

  formActionComment: async function (req, res) {
    try {
      const { slug } = req.params;
      const websiteQuery = `SELECT id FROM website WHERE slug = $1`;
      const websiteResult = await client.query(websiteQuery, [slug]);
      const website_id = websiteResult.rows[0].id;
      const user_id = req.session.userId;
      const comment = new Comment({ ...req.body, user_id, website_id });
      await comment.create();
      res.redirect("/tomates/" + slug);
    } catch (error) {
      console.error(error);
      res.render("comment-form", {
        message: "Commentaire invalide, veuillez réessayer",
      });
    }
  },

  createComment: async function (req, res) {
    try {
      const comment = new Comment(req.body);
      await comment.create();
      res.json({
        description: comment.description,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  },

  allJsonComment: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await client.query("SELECT * FROM comment WHERE id = $1", [
        id,
      ]);
      if (result.rowCount > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({
          message: "Le commentaire demandé n'existe pas.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Le serveur a rencontré un problème.",
      });
    }
  },

  deleteComment: async function (req, res) {
    try {
      const { id } = req.params;

      const comment = await Comment.read(id);

      const result = await comment.delete();

      if (result.rowCount > 0) {
        res.json({
          message: "Commentaire supprimé",
        });
      } else {
        res.status(404).json({
          message: "Le commentaire demandé n'existe pas.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Le serveur a rencontré un problème.",
      });
    }
  },
};
export default commentController;
