import validator from "validator";
import slugify from "slugify";
import client from "../database.js";

class Website {
  #id;
  #title;
  #slug;
  #description;
  #address;
  #device;
  #level;
  #user_id;
  #image;

  constructor(config) {
    this.id = config.id;
    this.title = config.title;
    this.slug = slugify(config.title, {
      lower: true,
      strict: true,
    });
    this.description = config.description;
    this.address = config.address;
    this.device = config.device;
    this.level = config.level;
    this.user_id = config.user_id;
    this.image = config.image;
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

  get address() {
    return this.#address;
  }

  get device() {
    return this.#device;
  }

  get level() {
    return this.#level;
  }

  get user_id() {
    return this.#user_id;
  }

  get image() {
    return this.#image;
  }

  set id(value) {
    if (typeof value !== "number" && typeof value !== "undefined") {
      throw new Error("Id incorrect");
    }
    this.#id = value;
  }

  set title(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Titre incorrect");
    }
    this.#title = value.trim();
  }

  set slug(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Slug incorrect");
    }
    this.#slug = value.trim();
  }

  set description(value) {
    this.#description = value;
  }

  set address(value) {
    if (!validator.isURL(value)) {
      throw new Error("Adresse incorrecte");
    }
    this.#address = value;
  }

  set device(value) {
    const allowedValues = ["Mobile", "Ordinateur", "Lecteur d'écran"];
    if (typeof value !== "undefined" && !allowedValues.includes(value)) {
      throw new Error(`3 valeurs autorisées : ${allowedValues.join(", ")}`);
    }
    this.#device = value;
  }

  set level(value) {
    const allowedValues = ["Bloquant", "Gênant", "Casse-tête"];
    if (typeof value !== "undefined" && !allowedValues.includes(value)) {
      throw new Error(`3 valeurs autorisées : ${allowedValues.join(", ")}`);
    }
    this.#level = value;
  }

  set user_id(value) {
    this.#user_id = value;
  }

  set image(value) {
    this.#image = value;
  }

  async create() {
    const text = `
      INSERT INTO website ("title", "slug", "description", "address", "device", "level", "user_id", "image")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
    `;
    const values = [
      this.title,
      this.slug,
      this.description,
      this.address,
      this.device,
      this.level,
      this.user_id,
      this.image,
    ];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  static async read(id) {
    const text = `
      SELECT * FROM website
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(text, values);
    if (result.rowCount > 0) {
      return new Website(result.rows[0]);
    } else {
      throw new Error("Website non trouvé");
    }
  }

  async update() {
    const text = `
    UPDATE website 
      SET 
        "title" = $1,
        "slug" = $2,
        "description" = $3,
        "address" = $4,
        "device" = $5,
        "level" = $6
      WHERE id = $7;
    `;
    const values = [
      this.title,
      this.slug,
      this.description,
      this.address,
      this.device,
      this.level,
      this.id,
    ];
    client.query(text, values);
  }

  async delete() {
    const text = `
        DELETE FROM website 
        WHERE slug = $1;
    `;
    const values = [this.slug];
    const result = await client.query(text, values);
    return result;
  }
}

export default Website;
