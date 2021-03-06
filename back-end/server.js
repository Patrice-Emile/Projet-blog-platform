import express from "express";
import { Model } from "objection";
import knexfile from "./knexfile.js";
import knex from "knex";
import cors from "cors";
import sessionRoutes from "./src/routes/session.js";
import usersRoutes from "./src/routes/users.js";
import contentsRoutes from "./src/routes/contents.js";
import usersModel from "./src/models/Users.js";
import hashPassword from "./src/hashPassword.js";

const app = express();
const db = knex(knexfile);
const port = process.env.PORT;

Model.knex(db);

app.use(express.json());
app.use(cors());

sessionRoutes({ app });
usersRoutes({ app });
contentsRoutes({ app });

// Line to comment on if you wish to change these users
const [hash, salt] = hashPassword("test");
await usersModel
  .query()
  .update({
    password_hash: hash,
    password_salt: salt,
  })
  .where({ id: 1 })
  .where({ id: 2 })
  .where({ id: 3 })
  .where({ id: 4 });

app.listen(port, () => console.log(`😋 Listening on :${port}`));
