import validator from "validator";
import client from "../database.js";
import sanitizeHtml from "sanitize-html";

class User {
  #id;
  #email;
  #hash;
  #pseudo;

  constructor(config) {
    this.id = config.id;
    this.email = config.email;
    this.hash = config.hash;
    this.pseudo = config.pseudo;
  }

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get hash() {
    return this.#hash;
  }
  get pseudo() {
    return this.#pseudo;
  }
  set id(value) {
    if (typeof value !== "number" && typeof value !== "undefined") {
      throw new Error("Id incorrect");
    }
    this.#id = value;
  }

  set email(value) {
    if (!validator.isEmail(value)) {
      throw new Error("Email invalide");
    }
    this.#email = value;
  }

  set hash(value) {
    if (!value) {
      throw new Error("Mot de passe invalide");
    }
    this.#hash = value;
  }

  set pseudo(value) {
    this.#pseudo = sanitizeHtml(value);
  }

  async create() {
    const text = `
      INSERT INTO "user" ("email", "hash")
      VALUES ($1, $2)
      RETURNING id;
    `;
    const values = [this.email, this.hash];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  static async read(id) {
    const text = `
      SELECT * FROM "user"
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(text, values);
    if (result.rowCount > 0) {
      return new User(result.rows[0]);
    } else {
      throw new Error("User non trouvé");
    }
  }

  async update() {
    const text = `
      UPDATE "user" 
      SET 
        "email" = $1,
        "hash" = $2,
        "pseudo" = $3
      WHERE id = $4;
    `;
    const values = [this.email, this.hash, this.#pseudo, this.id];
    await client.query(text, values);
  }

  async delete() {
    const text = `
      DELETE FROM "user"
      WHERE id = $1;
    `;
    const values = [this.id];
    await client.query(text, values);
  }
}

export default User;
