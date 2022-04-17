import React from "react";
import { Formik, Form, useField } from "formik";
import yupSchema from "../functions/yupSchema";
import TextArea from "./TextArea";
import AppContext from "./AppContext";
import { useContext, useState, useCallback, useEffect } from "react";
import Router from "next/router";

// And now we can use these
const FormComment = (props) => {
  const {
    id,
    postId,
    content,
    author,
    handleToggleUpdateComment,
    addComment,
    ...otherProps
  } = props;
  const { putDataAPI, postDataAPI, deleteDataAPI, error, setError, user } =
    useContext(AppContext);
  const [loadError, setLoadError] = useState(false);

  const handleSubmitComment = useCallback(
    (values, { setSubmitting }) => {
      console.log(values);
      console.log(error);
      setError(null);

      if (!values.content) {
        setError("Comment must be not empty.");
        resetComment();
        return;
      }

      if (addComment) {
        postDataAPI({
          url: "http://localhost:3000/posts/" + postId + "/comments",
          headers: { authentication: user.token },
          data: { content: values.content },
        });
        values.content = "";
      } else {
        putDataAPI({
          url: "http://localhost:3000/posts/" + postId + "/comments/" + id,
          data: { content: values.content },
        });
        handleToggleUpdateComment();
      }

      Router.push("/posts/" + postId);
      setSubmitting(true);
    },
    [putDataAPI, postDataAPI, setLoadError]
  );

  const handleDeleteComment = useCallback(() => {
    deleteDataAPI({
      url: "http://localhost:3000/posts/" + postId + "/comments/" + id,
      headers: { authentication: user.token },
    });
  }, [deleteDataAPI]);
  useEffect(() => {
    if (error) setLoadError(true);
    // console.log(result);
  });
  return (
    <>
      <Formik
        initialValues={{
          content,
        }}
        validationSchema={yupSchema}
        onSubmit={handleSubmitComment}
      >
        <Form {...otherProps}>
          <div>
            <h4>
              By <b>{author}</b>
            </h4>
            {addComment ? null : (
              <>
                <button onClick={handleToggleUpdateComment}>Back</button>
                <button onClick={handleDeleteComment}>Delete</button>
              </>
            )}
          </div>
          <TextArea name="content" className="commmentModeEditInput" />

          {loadError && error && <div className="error">{error}</div>}
          <button type="submit" className="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default FormComment;
