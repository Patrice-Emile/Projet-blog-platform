import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import DisplayerPage from "../../src/components/DisplayerPage";
import Content from "../../src/components/Content";
import Comment from "../../src/components/Comment";
import FormComment from "../../src/components/FormComment";
import AppContext from "../../src/components/AppContext";

const ContentPage = () => {
  // GET POST ID
  const {
    query: { postId },
  } = useRouter();

  const { getDataAPI, user } = useContext(AppContext);

  const [onePost, setOnePost] = useState(null);
  const [loadedButtons, setLoadedButtons] = useState(null);

  useEffect(() => {
    if (!user) {
      getDataAPI({
        url: "http://localhost:3000/posts/" + postId,
      }).then((data) => setOnePost(data));
    } else {
      getDataAPI({
        url: "http://localhost:3000/get-a-post-with-comments-of-user/" + postId,
        headers: { authentication: user.token },
      }).then((data) => setOnePost(data));

      getDataAPI({
        url:
          "http://localhost:3000/can-i-do-something-with-that-post/" + postId,
        headers: { authentication: user.token },
      }).then((data) => setLoadedButtons(data));
    }
  }, [getDataAPI]);

  if (!onePost) {
    return "Loading...";
  }
  if (onePost.errors) {
    return onePost.errors;
  }
  if (loadedButtons) {
    const { deletePost, updatePost } = loadedButtons;
  }
  const { post, commentsUser, comments } = onePost;

  return (
    <DisplayerPage>
      <div className={"content"}>
        {post && (
          <Content
            className={"post"}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            created_at={post.created_at}
            updated_at={post.updated_at}
            loadedButtons={loadedButtons}
          />
        )}
        {user ? (
          <FormComment postId={postId} author={user.name} addComment={true} />
        ) : null}
        {commentsUser &&
          commentsUser.map((commentUser) => (
            <Comment
              postId={postId}
              className={"comment"}
              key={commentUser.id}
              id={commentUser.id}
              content={commentUser.content}
              author={commentUser.author}
              created_at={commentUser.created_at}
              updated_at={commentUser.updated_at}
              loadedButtons={deletePost}
              allowEdit={true}
            />
          ))}
        {comments &&
          comments.map((comment) => (
            <Comment
              postId={postId}
              className={"comment"}
              key={comment.id}
              content={comment.content}
              author={comment.author}
              created_at={comment.created_at}
              updated_at={comment.updated_at}
              allowDelete={deletePost}
            />
          ))}
      </div>
    </DisplayerPage>
  );
};

export default ContentPage;
