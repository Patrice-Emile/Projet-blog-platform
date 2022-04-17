import DisplayerPage from "../src/components/DisplayerPage";
import Post from "../src/components/Post";
import Link from "next/link";
import AppContext from "../src/components/AppContext";
import { useContext, useEffect, useState } from "react";

const IndexPage = () => {
  const { getDataAPI, user } = useContext(AppContext);

  const [allPosts, setAllPosts] = useState(null);
  useEffect(() => {
    if (user && user.role !== "READER") {
      getDataAPI({
        url: "http://localhost:3000/posts-sort-for-user-connected",
        headers: { authentication: user.token },
      }).then((data) => setAllPosts(data));
    } else {
      getDataAPI({
        url: "http://localhost:3000/posts/",
      }).then((data) => setAllPosts(data));
    }
  }, [getDataAPI, setAllPosts]);

  if (!allPosts) {
    return "Landing...";
  }

  const { postsSave, otherPosts } = allPosts;

  return (
    <DisplayerPage>
      <div className="listPost">
        <h2>All the posts</h2>

        {postsSave && <h3>My posts</h3>}
        {postsSave &&
          postsSave.map((post) => (
            <Link
              key={post.id}
              href={{
                pathname: "/posts/" + post.id + "/edit-post",
                query: { id_post: post.id },
              }}
            >
              <Post
                key={post.id}
                title={post.save_title}
                content={post.save_content}
                author={post.author}
                created_at={post.created_at}
                updated_at={post.updated_at}
                className={"post"}
              />
            </Link>
          ))}
        {postsSave && <h3>Others posts</h3>}

        {otherPosts &&
          otherPosts.map((post) => (
            <Link key={"/posts/" + post.id} href={"/posts/" + post.id}>
              <Post
                className="post"
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                created_at={post.created_at}
                updated_at={post.updated_at}
              />
            </Link>
          ))}
      </div>
    </DisplayerPage>
  );
};

export default IndexPage;
