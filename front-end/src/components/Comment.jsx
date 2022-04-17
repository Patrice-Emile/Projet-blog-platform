import formattedDate from "../functions/formattedDate";
import { useContext, useEffect, useCallback, useState } from "react";
import FormComment from "./FormComment";
import AppContext from "./AppContext";
const Comment = (props) => {
  const {
    id,
    postId,
    content,
    author,
    created_at,
    updated_at,
    allowEdit,
    allowDelete,
    ...otherProps
  } = props;
  const [modeEdit, setmodeEdit] = useState(false);
  const { deleteDataAPI, user } = useContext(AppContext);
  const handleToggleUpdateComment = useCallback(() => {
    setmodeEdit((v) => !v);
  }, []);

  const handleDeleteComment = useCallback(() => {
    deleteDataAPI({
      url: "http://localhost:3000/posts/" + postId + "/comments/" + id,
      headers: { authentication: user.token },
    });
  }, [deleteDataAPI]);

  return (
    <>
      {modeEdit ? (
        <>
          <FormComment
            className={"commentModeEdit"}
            content={content}
            author={author}
            handleToggleUpdateComment={handleToggleUpdateComment}
            postId={postId}
            id={id}
          />
        </>
      ) : (
        <div {...otherProps} id-item-comment={id}>
          <div>
            <h4>
              By <b>{author}</b>, on {formattedDate(new Date(created_at))}
              {updated_at ? (
                <>, mis à jour le {formattedDate(new Date(updated_at))}</>
              ) : null}
            </h4>
            {allowEdit ? (
              <button onClick={handleToggleUpdateComment}>Edit</button>
            ) : null}
            {allowDelete ? (
              <button onClick={handleDeleteComment}>Delete</button>
            ) : null}
          </div>
          <div>{content}</div>
        </div>
      )}
    </>
  );
};

export default Comment;
