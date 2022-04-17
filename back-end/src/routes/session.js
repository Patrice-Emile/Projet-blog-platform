import usersModel from "../models/Users.js";
import roleModel from "../models/Role.js";
import hashPassword from "../hashPassword.js";
import auth from "../middleware/auth.js";
import errorMessages from "../util/errorMessages.js";
import roles from "../util/roles.js";
import yupSchema from "../util/yupSchema.js";
import jsonwebtoken from "jsonwebtoken";

const sessionRoutes = ({ app }) => {
  // POST SIGN UP
  // curl -X POST localhost:3000/sign-up -H 'Content-Type: application/json' -d '{"email":"toto@toto.com","password":"123456Az$"}'
  app.post("/sign-up", async (req, res, next) => {
    const {
      body: { email, password },
    } = req;
    try {
      await yupSchema.validate(
        { email: email, password: password },
        {
          abortEarly: false,
        }
      );

      const userRole = await roleModel
        .query()
        .select("id")
        .where({ name: roles.READER })
        .first();
      if (!userRole.id) {
        res.send({ errors: [errorMessages.roleNotFound] });
      }

      const user = await usersModel.query().where({ email });

      if (user.length) {
        res.send({ errors: [errorMessages.invalidLogin] });
        return;
      }

      const [hash, salt] = hashPassword(password);

      const newUser = await usersModel.query().insertAndFetch({
        email: email,
        name: "The best " + roles.READER,
        id_role: userRole.id,
        password_hash: hash,
        password_salt: salt,
      });

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            user: {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
            },
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "2 days" }
      );
      res.send({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: roles.READER,
        created_at: newUser.created_at,
        token: jwt,
      });
    } catch (error) {
      res.send(error);
    }
  });

  // POST SIGN IN
  // curl -X POST localhost:3000/sign-in -H 'Content-Type: application/json' -d '{"email":"toto@toto.com","password":"123456Az$"}'
  app.post("/sign-in", async (req, res, next) => {
    const {
      body: { email, password },
    } = req;

    try {
      const user = await usersModel.query().findOne({ email });

      if (!user) {
        res.send({ errors: [errorMessages.invalidLogin] });
        return;
      }

      const [hash] = hashPassword(password, user.password_salt);

      if (hash !== user.password_hash) {
        res.send({ errors: [errorMessages.invalidLogin] });
        return;
      }
      if (!user.active) {
        res.send({ errors: [errorMessages.suspendAccount] });
        return;
      }
      const role = await usersModel
        .query()
        .select("r.name")
        .innerJoin("role as r", "users.id_role", "r.id")
        .where("deleted_at", null)
        .findById(user.id);

      if (!role) {
        res.send(errorMessages.userNotFound);
        return;
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const jwt = await jsonwebtoken.sign(
        { payload: { user: payload } },
        process.env.JWT_SECRET,
        {
          expiresIn: "2 days",
        }
      );
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: role.name,
        created_at: user.created_at,

        token: jwt,
      });
    } catch (error) {
      res.send(error);
    }
  });

  // GET SESSIOn
  // curl -X GET localhost:3000/session -H "authentication:"
  app.get("/session", auth, (req, res) => {
    res.send("Bienvenue mon Sauce !");
  });
};

export default sessionRoutes;
