import client from "../database.js";
import sanitizeHtml from "sanitize-html";
import slugify from "slugify";

class Article {
  #id;
  #title;
  #slug;
  #description;
  #user_id;

  constructor(config) {
    this.id = config.id;
    this.title = config.title;
    this.slug = slugify(config.title, {
      lower: true,
      strict: true,
    });
    this.description = config.description;
    this.user_id = config.user_id;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get slug() {
    return this.#slug;
  }

  get description() {
    return this.#description;
  }
  get user_id() {
    return this.#user_id;
  }

  set id(value) {
    if (typeof value !== "number" && typeof value !== "undefined") {
      throw new Error("Id incorrect");
    }
    this.#id = value;
  }

  set title(value) {
    this.#title = value;
  }

  set slug(value) {
    this.#slug = value;
  }

  set description(value) {
    this.#description = sanitizeHtml(value, {
      allowedTags: ["p", "br"],
      allowedAttributes: {},
    });
  }

  set user_id(value) {
    this.#user_id = value;
  }

  async create() {
    const text = `
      INSERT INTO article ("title", "slug", "description", "user_id") 
      VALUES ($1, $2, $3, $4) 
      RETURNING id;
    `;
    const values = [this.title, this.slug, this.description, this.user_id];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  static async read(id) {
    const text = `
      SELECT * FROM article
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(text, values);
    if (result.rowCount > 0) {
      return new Comment(result.rows[0]);
    } else {
      throw new Error("Commentaire non trouvé");
    }
  }

  async update() {
    const text = `
    UPDATE article 
      SET 
        "title" = $1,
        "slug" = $2
        "description" = $3
      WHERE id = $4;
    `;
    const values = [this.title, this.slug, this.description];
    client.query(text, values);
  }

  async delete() {
    const text = `
      DELETE FROM article 
      WHERE id = $1;
    `;
    const values = [this.id];
    client.query(text, values);
  }
}

export default Article;
