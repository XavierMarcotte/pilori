import Article from "../models/Article.js";
import client from "../database.js";

const articleController = {
  page: async function (req, res) {
    const articles = await client.query(`SELECT * FROM article`);
    res.render("article", {
      articles: articles.rows,
    });
  },

  form: async function (req, res) {
    // const csrfToken = req.csrfToken();
    // req.session.csrfToken = csrfToken;
    // res.render("formArticle", { csrfToken: req.csrfToken() });
    res.render("formArticle");
  },

  formAction: async function (req, res) {
    try {
      const user_id = req.session.userId;
      const article = new Article({ ...req.body, user_id });
      article.create();
      res.redirect("/article");
    } catch (error) {
      res.render("formArticle", { error: error });
    }
  },

  details: async function (req, res) {
    console.log("hey");
    try {
      const { slug } = req.params;
      const result = await client.query(
        "SELECT * FROM article WHERE slug = $1",
        [slug]
      );
      if (result.rowCount > 0) {
        res.render("detailArticle", {
          article: result.rows[0],
        });
      } else {
        next();
      }
    } catch (error) {}
  },
};

export default articleController;
