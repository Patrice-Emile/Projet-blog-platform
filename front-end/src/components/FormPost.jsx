import React from "react";
import { Formik, Form, useField } from "formik";
import yupSchema from "../functions/yupSchema";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import AppContext from "./AppContext";
import { useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/Link";

// And now we can use these
const FormPost = (props) => {
  const { id, author, addPost, ...otherProps } = props;
  const {
    query: { id_post },
  } = useRouter();
  const {
    getDataAPI,
    putDataAPI,
    postDataAPI,
    deleteDataAPI,
    error,
    setError,
    user,
  } = useContext(AppContext);

  const [loadError, setLoadError] = useState(false);
  const [post, setPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublishPost = useCallback(() => {
    setError(null);
    if (!content || !title) {
      setError("Post content or title must be not empty.");
      return;
    }

    if (addPost) {
      postDataAPI({
        url: "http://localhost:3000/posts",
        headers: { authentication: user.token },
        data: {
          title: title,
          content: content,
          save_content: null,
          save_title: null,
          is_published: true,
        },
      });
      Router.push("/");
    } else {
      putDataAPI({
        url: "http://localhost:3000/posts/" + (id_post ? id_post : id),
        headers: { authentication: user.token },
        data: {
          title: title,
          content: content,
          save_content: null,
          save_title: null,
          is_published: true,
        },
      });
      Router.push("/posts/" + (id_post ? id_post : id));
    }
  }, [putDataAPI, postDataAPI, content, title]);

  const handleSavePost = useCallback(() => {
    if (!content || !title) {
      setError("Post content or title must be not empty.");
      return;
    }
    if (addPost) {
      postDataAPI({
        url: "http://localhost:3000/posts/",
        headers: { authentication: user.token },
        data: {
          save_title: title,
          save_content: content,
        },
      });
      Router.push("/");
    } else {
      putDataAPI({
        url:
          "http://localhost:3000/posts/" + (id_post ? id_post : id) + "/save",
        headers: { authentication: user.token },
        data: { save_title: title, save_content: content },
      });
      Router.push(id_post ? "/" : "/posts/" + id);
    }
  }, [putDataAPI, title, content]);

  const handleDeletePost = useCallback(() => {
    deleteDataAPI({
      url: "http://localhost:3000/posts/" + (id_post ? id_post : id),
      headers: { authentication: user.token },
    });
    Router.push("/");
  }, [deleteDataAPI]);

  useEffect(
    () =>
      getDataAPI({
        url:
          "http://localhost:3000/posts/" +
          (id_post ? id_post : id) +
          "/get-save-edit",
        headers: { authentication: user.token },
      }).then((data) => setPost(data)),
    [getDataAPI]
  );

  useEffect(() => {
    if (error) setLoadError(true);
    if (!post) {
      return "Landing...";
    }
    if (post) {
      setTitle(post.save_title);
      setContent(post.save_content);
    }
  }, [post, setTitle, setContent]);

  return (
    <>
      <Formik
        initialValues={{
          content,
          title,
        }}
        validationSchema={yupSchema}
      >
        <Form {...otherProps}>
          <div className="divbtn">
            <h4>
              By <b>{author}</b>
            </h4>
            {addPost ? null : (
              <div>
                <button className="btnDel" onClick={handleDeletePost}>
                  Delete
                </button>
                <Link href={id_post ? "/" : "/posts/" + id}>
                  <button className="btnBack">Cancel</button>
                </Link>
              </div>
            )}
          </div>
          <TextInput
            label="Title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextArea
            label="Post content"
            name="content"
            className="commmentModeEditInput"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          {loadError && error && <div className="error">{error}</div>}
          <div className="divbtn">
            <button
              type="submit"
              onClick={handlePublishPost}
              className="btnPublish"
            >
              Publish
            </button>
            <button type="submit" onClick={handleSavePost} className="btnSave">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default FormPost;
