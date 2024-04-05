import client from "../database";
import sanitizeHtml from "sanitize-html";

class Article {
  #id;
  #titre;
  #description;
  #user_id;

  constructor(config) {
    this.id = config.id;
    this.titre = config.titre;
    this.description = config.description;
    this.user_id = config.user_id;
  }

  get id() {
    return this.#id;
  }

  get titre() {
    return this.#titre;
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

  set titre(value) {
    this.#titre = value;
  }

  set description(value) {
    this.#description = sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  set user_id(value) {
    this.#user_id = value;
  }

  async create() {
    const text = `
      INSERT INTO article ("titre", "description", "user_id") 
      VALUES ($1, $2, $3) 
      RETURNING id;
    `;
    const values = [this.titre, this.description, this.user_id];
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
        "titre" = $1,
        "description" = $2
      WHERE id = $3;
    `;
    const values = [this.titre, this.description];
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
