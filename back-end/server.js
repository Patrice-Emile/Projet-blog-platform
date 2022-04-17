import express from "express";
import { Model, raw } from "objection";
import knexfile from "./knexfile.js";
import knex from "knex";
import cors from "cors";
import sessionRoutes from "./src/routes/session.js";
import usersRoutes from "./src/routes/users.js";
import contentsRoutes from "./src/routes/contents.js";
import usersModel from "./src/models/Users.js";
import postModel from "./src/models/Post.js";
import roles from "./src/util/roles.js";
import errorMessages from "./src/util/errorMessages.js";
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

// curl -X DELETE http://localhost:3000/delPost/
app.delete("/delPost/:id_post", async (req, res) => {
  const {
    params: { id_post },
  } = req;
  await postModel.query().deleteById(id_post);
  res.send("[" + id_post + "] " + errorMessages.postDeleted);
});

// curl -X DELETE http://localhost:3000/resetUsers

app.delete("/resetUsers", async (req, res) => {
  await usersModel.query().delete();
  const [hash, salt] = hashPassword("test");
  await usersModel.query().insert([
    {
      id: 1,
      id_role: 1,
      name: "Obi Wan Kenobi",
      email: "obi@fromthestar.star",
      password_hash: hash,
      password_salt: salt,
    },
    {
      id: 2,
      id_role: 2,
      name: "johnny depp",
      email: "lejoe@fromthesea.pirate",
      password_hash: hash,
      password_salt: salt,
    },
    {
      id: 3,
      id_role: 3,
      name: "Paul Walker",
      email: "rapideetfurieux@lesbagnols.vroumvroum",
      password_hash: hash,
      password_salt: salt,
    },
    {
      id: 4,
      id_role: 1,
      name: "The Testeur",
      email: "test@test.test",
      password_hash: hash,
      password_salt: salt,
    },
  ]);
  res.send("Users table sucessfully rebuilded");
});
// READ ALL ROLES
// curl -X GET localhost:3000/roles

app.get("/roles", async (req, res) => {
  const {
    user: { id, role, email, name },
  } = req;
  if (role !== roles.ADMIN) {
    res.send(errorMessages.cannotAllow);
    return;
  }
  const item = await roleModel.query().select("id", "name");
  // const item = await usersModel.query();
  // console.log(item);

  if (!item.length) {
    res.send(errorMessages.roleNotFound);
    return;
  }
  res.send(item);
});

const [hash, salt] = hashPassword("test");

await usersModel.query().update({
  password_hash: hash,
  password_salt: salt,
});

app.listen(port, () => console.log(`😋 Listening on :${port}`));
