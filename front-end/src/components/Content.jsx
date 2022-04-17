import formattedDate from "../functions/formattedDate";
import { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../../src/components/AppContext";
import Router from "next/Router";
import Link from "next/link";

const Content = (props) => {
  const {
    id,
    title,
    content,
    author,
    created_at,
    updated_at,
    loadedButtons,
    ...otherProps
  } = props;
  const { deleteDataAPI, getDataAPI, user } = useContext(AppContext);

  const handleDeletePost = useCallback(() => {
    deleteDataAPI({
      url: "http://localhost:3000/posts/" + id,
      headers: { authentication: user.token },
    });
    Router.push("/");
  }, [deleteDataAPI]);

  if (loadedButtons) {
    const { updatePost, deletePost } = loadedButtons;
  }

  return (
    <div {...otherProps}>
      <div className="">
        <h3>{title}</h3>
        <h4>
          By <b>{author}</b>, on {formattedDate(new Date(created_at))}
          {updated_at ? (
            <>, mis à jour le {formattedDate(new Date(updated_at))}</>
          ) : null}
        </h4>
        {updatePost ? (
          <Link
            href={{
              pathname: "/posts/" + id + "/edit-post",
              query: { id, title, content },
            }}
          >
            <button>Edit Post</button>
          </Link>
        ) : null}
        {deletePost ? (
          <>
            <button onClick={handleDeletePost}>Delete Post</button>
          </>
        ) : null}
      </div>
      <div>{content}</div>
    </div>
  );
};

export default Content;
