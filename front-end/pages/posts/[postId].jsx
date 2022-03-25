import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import DisplayerPage from "../../src/components/DisplayerPage";
import Content from "../../src/components/Content";
import Comment from "../../src/components/Comment";
import Button from "../../src/components/Button";
import AppContext from "../../src/components/AppContext";

const ContentPage = (props) => {
  // GET POST ID
  const {
    query: { postId },
  } = useRouter();

  const { getDataAPI, result, loaded } = useContext(AppContext);

  const [onePost, setOnePost] = useState(null);

  useEffect(
    () =>
      getDataAPI({
        url: "http://localhost:3000/posts/" + postId,
      }).then((data) => setOnePost(data)),
    []
  );

  if (!onePost || onePost.errors) {
    return "Loading...";
  }
  const { post, comments } = onePost;

  // console.log("post : ", post);
  // console.log("comments : ", comments);

  console.log("onePost : ", onePost);
  console.log(post.id);

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
          />
        )}
        {comments &&
          comments.map((comment) => (
            <Comment
              className={"comment"}
              key={comment.id}
              content={comment.content}
              author={comment.author}
              created_at={comment.created_at}
              updated_at={comment.updated_at}
            />
          ))}
        <p>
          <Button variant="secondary" size="lg">
            SAVE
          </Button>
        </p>
      </div>
    </DisplayerPage>
  );
};

export default ContentPage;
