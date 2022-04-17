import postModel from "../models/Post.js";
import commentModel from "../models/Comment.js";
import auth from "../middleware/auth.js";
import errorMessages from "../util/errorMessages.js";
import roles from "../util/roles.js";
import yupSchema from "../util/yupSchema.js";

const contentsRoutes = ({ app }) => {
  //--------------------------------//
  //             POSTS              //
  //--------------------------------//

  // POST ONE POST
  // curl -X POST localhost:3000/posts -H 'Content-Type: application/json' -d '{"title":"title","content":"blabla","is_published":1}' -H "authentication:"
  app.post("/posts", auth, async (req, res) => {
    const {
      body: { save_title, save_content, title, content, is_published },
      user: { id, role },
    } = req;
    if (role === roles.READER) {
      res.send({ errors: [errorMessages.cannotAllow] });
      return;
    }

    try {
      console.log("req.body : ", req.body);
      // console.log("req.user", req.user);

      await yupSchema.validate(req.body, {
        abortEarly: false,
      });

      const item = await postModel.query().insert({
        id_user: id,
        save_title,
        save_content,
        title,
        content,
        is_published,
      });

      if (item.length) {
        res.send({ errors: [errorMessages.cannotInsertPost] });
        return;
      }
      res.send(item);
    } catch (error) {
      res.send({ errors: [error] });
    }
  });

  // SAVE A POST
  // curl -X POST localhost:3000/posts -H 'Content-Type: application/json' -d '{"title":"title","content":"blabla","is_published":1}' -H "authentication:"
  app.put("/posts/:id_post/save", auth, async (req, res) => {
    const {
      params: { id_post },
      body: { save_title, save_content },
      user: { id },
    } = req;

    try {
      const data = {
        title: save_title,
        content: save_content,
      };
      await yupSchema.validate(data, {
        abortEarly: false,
      });

      const item = await postModel.query().where({ id: id_post, id_user: id });
      // const item = await postModel.query();
      if (!item.length) {
        res.send({ errors: [errorMessages.postNotFound] });
        return;
      }

      const updatedItem = await postModel.query().patchAndFetchById(id_post, {
        save_title,
        save_content,
      });
      res.send(updatedItem);
    } catch (error) {
      res.send({ errors: [error] });
    }
  });

  // GET AUTHORIZATION TO UPDATE OR DELETE THAT POST
  // curl -X GET http://localhost:3000/can-i-do-something-with-that-post/1 -H "authentication:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOjI0LCJlbWFpbCI6ImFAYS5hIiwibmFtZSI6IlRoZSBiZXN0IFJFQURFUiJ9fSwiaWF0IjoxNjUwMjAwOTE3LCJleHAiOjE2NTAzNzM3MTd9.PePSHXz9zXPjaugE8NSwIk4hhEhq1ZW-v3E40jYuxiU"
  app.get(
    "/can-i-do-something-with-that-post/:id_post",
    auth,
    async (req, res) => {
      const {
        params: { id_post },
        user: { id, role, email, name },
      } = req;

      if (role === roles.READER) {
        res.send({ errors: [errorMessages.cannotAllow] });
        return;
      }
      try {
        // console.log("req.body : ", req.body);
        // console.log("req.user", req.user);
        let updatePost = false;
        let deletePost = false;

        const item = await postModel
          .query()
          .findOne({ id_user: id, id: id_post });
        console.log("item : ", item);

        if (item) {
          updatePost = true;
        }

        if (role === roles.ADMIN) {
          deletePost = true;
        }
        res.send({ updatePost, deletePost });
      } catch (error) {
        res.send({ errors: [error] });
      }
    }
  );

  // READ ALL POSTS WITH ALL COMMENTS'S USER BROUGHT TO THE FORE
  // curl -X POST localhost:3000/get-a-post-with-comments-of-user
  app.get(
    "/get-a-post-with-comments-of-user/:id_post",
    auth,
    async (req, res) => {
      const {
        user: { id, role, email, name },
        params: { id_post },
      } = req;

      try {
        await yupSchema.validate({ id: id_post }, { abortEarly: false });
        // console.log(id);
        const post = await postModel
          .query()
          .select(
            "post.id",
            "name as author",
            "title",
            "content",
            "post.created_at",
            "post.updated_at"
          )
          .innerJoin("users as u", "post.id_user", "u.id")
          .where("is_published", true)
          .where("post.deleted_at", null)
          .findOne({ "post.id": id_post });
        // console.log(post);
        if (!post) {
          res.send({ errors: [errorMessages.postNotFound] });
          return;
        }
        const commentsUser = await commentModel
          .query()
          .select(
            "comment.id",
            "name as author",
            "content",
            "comment.created_at",
            "comment.updated_at"
          )
          .innerJoin("users as u", "comment.id_user", "u.id")
          .where({ "comment.id_post": id_post })
          .where({ "comment.id_user": id })
          .where("comment.deleted_at", null);
        // console.log("commentsUser: ", commentsUser);

        const comments = await commentModel
          .query()
          .select(
            "comment.id",
            "name as author",
            "content",
            "comment.created_at",
            "comment.updated_at"
          )
          .innerJoin("users as u", "comment.id_user", "u.id")
          .where({ "comment.id_post": id_post })
          .where("comment.id_user", "<>", id)
          .where("comment.deleted_at", null);
        // console.log("comments: ", comments);

        const item = {
          post,
          commentsUser,
          comments,
        };
        res.send(item);
      } catch (error) {
        res.send({ errors: [error] });
      }
    }
  );

  // READ ALL POSTS
  // curl -X GET localhost:3000/posts
  app.get("/posts", async (req, res) => {
    const item = await postModel
      .query()
      .select(
        "post.id",
        "name as author",
        "title",
        "content",
        "post.created_at",
        "post.updated_at"
      )
      .innerJoin("users as u", "post.id_user", "u.id")
      .where("is_published", true)
      .where("post.deleted_at", null);
    // console.log(item);

    if (!item.length) {
      res.send({ errors: [errorMessages.noPost] });
      return;
    }
    res.send({ otherPosts: item });
  });

  // READ ALL POSTS
  // curl -X GET localhost:3000/posts
  app.get("/posts-sort-for-user-connected", auth, async (req, res) => {
    const {
      user: { id },
    } = req;
    const postsSave = await postModel
      .query()
      .select(
        "post.id",
        "name as author",
        "save_title",
        "save_content",
        "post.created_at",
        "post.updated_at",
        "is_published"
      )
      .innerJoin("users as u", "post.id_user", "u.id")
      .where({ "u.id": id })
      .where("post.deleted_at", null);
    // console.log(item);

    const otherPosts = await postModel
      .query()
      .select(
        "post.id",
        "name as author",
        "title",
        "content",
        "post.created_at",
        "post.updated_at"
      )
      .innerJoin("users as u", "post.id_user", "u.id")
      .where("is_published", true)
      .where("u.id ", "<>", id)
      .where("post.deleted_at", null);
    // console.log(item);

    res.send({ postsSave, otherPosts });
  });
  // READ ONE POST
  // curl -X GET localhost:3000/posts/1
  app.get("/posts/:id_post/get-save-edit", auth, async (req, res) => {
    const {
      user: { id },
      params: { id_post },
    } = req;
    try {
      await yupSchema.validate({ id, id: id_post }, { abortEarly: false });
      // console.log(id);
      const post = await postModel
        .query()
        .select("save_title", "save_content")
        .innerJoin("users as u", "post.id_user", "u.id")
        .where("post.deleted_at", null)
        .findOne({ "post.id": id_post });
      // console.log(post);
      if (!post) {
        res.send({ errors: [errorMessages.postNotFound] });
        return;
      }

      res.send(post);
    } catch (error) {
      res.send({ errors: [error] });
    }
  });

  // READ ONE POST
  // curl -X GET localhost:3000/posts/1
  app.get("/posts/:id", async (req, res) => {
    const {
      params: { id },
    } = req;
    try {
      await yupSchema.validate({ id }, { abortEarly: false });
      // console.log(id);
      const post = await postModel
        .query()
        .select(
          "post.id",
          "name as author",
          "title",
          "content",
          "post.created_at",
          "post.updated_at"
        )
        .innerJoin("users as u", "post.id_user", "u.id")
        .where("is_published", true)
        .where("post.deleted_at", null)
        .findOne({ "post.id": id });
      // console.log(post);
      if (!post) {
        res.send({ errors: [errorMessages.postNotFound] });
        return;
      }
      const comments = await commentModel
        .query()
        .select(
          "comment.id",
          "name as author",
          "content",
          "comment.created_at",
          "comment.updated_at"
        )
        .innerJoin("users as u", "comment.id_user", "u.id")
        .where({ "comment.id_post": id })
        .where("comment.deleted_at", null);
      // console.log(comments);

      const item = {
        post,
        comments,
      };
      res.send(item);
    } catch (error) {
      res.send({ errors: [error] });
    }
  });

  // UPDATE ONE POST
  // curl -X PUT localhost:3000/posts/22 -H 'Content-Type: application/json' -d '{"title":"super title","content":"super blabla","is_published":0}' -H "authentication:"
  app.put("/posts/:id_post", auth, async (req, res) => {
    const {
      params: { id_post },
      body: { title, content, is_published },
      user: { id, role, email, name },
    } = req;

    if (role === roles.READER) {
      res.send({ errors: [errorMessages.cannotAllow] });
      return;
    }
    try {
      const data = {
        title,
        content,
        is_published,
      };
      await yupSchema.validate(data, {
        abortEarly: false,
      });

      const item = await postModel.query().where({ id: id_post, id_user: id });
      // const item = await postModel.query();
      if (!item.length) {
        res.send({ errors: [errorMessages.postNotFound] });
        return;
      }

      const updatedItem = await postModel.query().patchAndFetchById(id_post, {
        title: title,
        content: content,
        is_published: is_published,
        updated_at: new Date(Date.now()).toUTCString(),
      });
      res.send(updatedItem);
    } catch (error) {
      res.send({ errors: [error] });
    }
  });

  // DELETE ONE POST
  // curl -X DELETE localhost:3000/posts/2
  app.delete("/posts/:id_post", auth, async (req, res) => {
    const {
      params: { id_post },
      user: { id, role, email, name },
    } = req;

    if (role === roles.READER) {
      res.send({ errors: [errorMessages.cannotAllow] });
      return;
    }
    const item = await postModel.query().where({ id: id_post, id_user: id });

    if (!item.length || role !== roles.ADMIN) {
      res.send({ errors: [errorMessages.postNotFound] });
      return;
    }

    await postModel.query().deleteById(id_post);
    res.send("[" + id_post + "] " + errorMessages.postDeleted);
  });

  //-------------------------------//
  //           COMMENTS            //
  //-------------------------------//

  // POST ONE COMMENT
  // curl -X POST localhost:3000/posts/1/comments -H 'Content-Type: application/json' -d '{"content":"test comment"}' -H "authentication:"
  app.post("/posts/:id_post/comments", auth, async (req, res) => {
    const {
      params: { id_post },
      body: { content },
      user: { id },
    } = req;

    // try {
    await yupSchema.validate(req.body, {
      abortEarly: false,
    });

    const post = await postModel.query().findById(id_post);
    if (!post) {
      res.send({ errors: [errorMessages.postNotFound] });
      return;
    }
    const item = await commentModel.query().insert({
      id_user: id,
      id_post: id_post,
      content,
      created_at: new Date(Date.now()).toUTCString(),
    });
    console.log(item);
    if (item.length) {
      res.send({ errors: [errorMessages.cannotInsertPost] });
      return;
    }
    res.send(item);
    // } catch (error) {
    //   res.send({ errors: [error] });
    // }
  });

  // UPDATE ONE COMMENT
  // curl -X PUT localhost:3000/posts/1/comments/1 -H 'Content-Type: application/json' -d '{"content":"super blabla"}' -H "authentication:"
  app.put("/posts/:id_post/comments/:id_comment", auth, async (req, res) => {
    const {
      params: { id_post, id_comment },
      body: { content },
      user: { id, role, email, name },
    } = req;
    // console.log("id_post : ", id_post);
    // console.log("id_comment : ", id_comment);
    try {
      await yupSchema.validate(
        {
          content,
        },
        {
          abortEarly: false,
        }
      );
      const post = await postModel.query().findById(id_post);
      // console.log("post : ", post);

      if (!post) {
        res.send({ errors: [errorMessages.postNotFound] });
        return;
      }

      const comment = await commentModel
        .query()
        .findOne({ id: id_comment, id_user: id, id_post });
      // console.log("comment : ", comment);

      if (!comment) {
        res.send({ errors: [errorMessages.commentNotFound] });
        return;
      }

      const updatedItem = await commentModel
        .query()
        .patchAndFetchById(id_comment, {
          content: content,
          updated_at: new Date(Date.now()).toUTCString(),
        });
      res.send(updatedItem);
    } catch (error) {
      res.send();
    }
  });

  // DELETE ONE COMMENT
  // curl -X DELETE localhost:3000/posts/1/comments/3  -H "authentication:"
  app.delete("/posts/:id_post/comments/:id_comment", auth, async (req, res) => {
    const {
      params: { id_post, id_comment },
      user: { id, role, email, name },
    } = req;

    const item = await commentModel
      .query()
      .findOne({ id: id_comment, id_post, id_user: id });

    if (!item) {
      res.send({ errors: [errorMessages.commentNotFound] });
      return;
    }
    // console.log("comment : ", item);
    await commentModel.query().deleteById(id_comment);
    res.send("[" + id_comment + "] " + errorMessages.commentDeleted);
  });
};

export default contentsRoutes;
