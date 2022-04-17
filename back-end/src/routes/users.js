import usersModel from "../models/users.js";
import roleModel from "../models/role.js";
import auth from "../middleware/auth.js";
import hashPassword from "../hashPassword.js";
import errorMessages from "../util/errorMessages.js";
import yupSchema from "../util/yupSchema.js";
import roles from "../util/roles.js";

const usersRoutes = ({ app }) => {
  // UPDATE USER ROLE
  // curl -X PUT localhost:3000/roles/2 -H 'Content-Type: application/json' -d '{"email":"tata@tata.com","password":"123456Az$"}'
  app.put("/change-user-role-activity/:id_user", auth, async (req, res) => {
    const {
      params: { id_user },
      body: { new_role, active },
      user: { id, role, email, name },
    } = req;
    if (role !== roles.ADMIN) {
      res.send(errorMessages.cannotAllow);
      return;
    }

    const item = await usersModel.query().where({ id: id_user });
    // const item = await usersModel.query();
    console.log("item : ", item);

    if (!item.length) {
      res.send(errorMessages.userNotFound);
      return;
    }
    const newRole = await roleModel.query().findOne({ name: new_role });

    if (!newRole) {
      res.send(errorMessages.roleNotFound);
      return;
    }
    console.log("newRole : ", newRole);

    const updatedItem = await usersModel.query().patchAndFetchById(id_user, {
      id_role: newRole.id,
      active: active,
    });
    console.log("updatedItem : ", updatedItem);

    res.send(updatedItem);
  });

  // READ ALL USERS
  // curl -X GET localhost:3000/users
  app.get("/users", auth, async (req, res) => {
    const {
      user: { id, role, email, name },
    } = req;
    if (role !== roles.ADMIN) {
      res.send(errorMessages.cannotAllow);
      return;
    }
    const item = await usersModel
      .query()
      .select(
        "users.id",
        "r.name as role",
        "users.name",
        "email",
        "active",
        "created_at",
        "updated_at"
      )
      .innerJoin("role as r", "users.id_role", "r.id")
      .where("deleted_at", null)
      .where("users.id", "<>", id);
    // const item = await usersModel.query();
    // console.log(item);

    if (!item.length) {
      res.send(errorMessages.noUsers);
      return;
    }
    res.send(item);
  });

  // UPDATE ONE USER
  // curl -X PUT localhost:3000/users/2 -H 'Content-Type: application/json' -d '{"email":"tata@tata.com","password":"123456Az$"}'
  app.put("/users/:id_user", auth, async (req, res) => {
    const {
      params: { id_user },
      body: { new_name, new_email, new_password, confirmPassword },
      user: { id, role, email, name },
      headers: { authentication },
    } = req;

    try {
      await yupSchema.validate(
        {
          name: new_name,
          email: new_email,
          password: new_password,
        },
        {
          abortEarly: false,
        }
      );
      const item = await usersModel.query().where({ id: id_user });
      // const item = await usersModel.query();
      console.log(item);
      if (!item.length) {
        res.send(errorMessages.userNotFound);
        return;
      }
      const [hash, salt] = hashPassword(new_password);
      console.log(new_email, new_name);
      const updatedItem = await usersModel.query().patchAndFetchById(id_user, {
        email: new_email,
        name: new_name,
        password_hash: hash,
        password_salt: salt,
        updated_at: new Date(Date.now()).toUTCString(),
      });
      res.send({
        id: updatedItem.id,
        email: updatedItem.email,
        name: updatedItem.name,
        role: role,
        created_at: updatedItem.created_at,
        token: authentication,
      });
    } catch (error) {
      res.send(error);
    }
  });

  // DELETE ONE USER
  // curl -X DELETE localhost:3000/users/2
  app.delete("/users/:id_user", auth, async (req, res) => {
    const {
      params: { id_user },
      user: { id, role, email, name },
    } = req;

    const item = await usersModel.query().where({ id: id_user });
    if (!item.length) {
      res.send(errorMessages.userNotFound);
      return;
    }

    await usersModel.query().patchAndFetchById(id_user, {
      delete_at: new Date(Date.now()).toUTCString(),
      active: 0,
    });
    res.send("[" + id_user + "] " + errorMessages.userDeleted);
  });
};

export default usersRoutes;
