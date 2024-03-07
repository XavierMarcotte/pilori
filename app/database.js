import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const client = new pg.Client();
client.connect();

export default client;

// import { Client } from "pg";

// const client = new Client({
//   host: "localhost",
//   port: 5432,
//   user: "testpilori",
//   password: "testpilori",
//   database: "testpilori",
// });

// client.connect();

// export default client;

// import pg from "pg";
// import * as dotenv from "dotenv";

// dotenv.config();

// const client = new pg.Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// client.connect();

// export default client;
