import client from "../database.js";

class Comment {
  #id;
  #description;
  #user_id;
  #website_id;

  constructor(config) {
    this.id = config.id;
    this.description = config.description;
    this.user_id = config.user_id;
    this.website_id = config.website_id;
  }

  get id() {
    return this.#id;
  }

  get description() {
    return this.#description;
  }

  get user_id() {
    return this.#user_id;
  }

  get website_id() {
    return this.#website_id;
  }

  set id(value) {
    if (typeof value !== "number" && typeof value !== "undefined") {
      throw new Error("Id incorrecte");
    }
    this.#id = value;
  }

  set description(value) {
    this.#description = value;
  }

  set user_id(value) {
    this.#user_id = value;
  }

  set website_id(value) {
    this.#website_id = value;
  }

  async create() {
    const text = `
      INSERT INTO comment ("description", "user_id", "website_id") 
      VALUES ($1, $2, $3) 
      RETURNING id;
    `;
    const values = [this.description, this.user_id, this.website_id];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  static async read(id) {
    const text = `
      SELECT * FROM comment
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
    UPDATE comment 
      SET 
        "description" = $1
      WHERE id = $2;
    `;
    const values = [this.description];
    client.query(text, values);
  }

  async delete() {
    const text = `
      DELETE FROM comment 
      WHERE id = $1;
    `;
    const values = [this.id];
    client.query(text, values);
  }
}

export default Comment;
