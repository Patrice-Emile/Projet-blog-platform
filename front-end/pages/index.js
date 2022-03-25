import DisplayerPage from "../src/components/DisplayerPage";
import Post from "../src/components/Post";
import Link from "next/link";
import AppContext from "../src/components/AppContext";
import { useContext, useEffect, useState } from "react";

const IndexPage = () => {
  const { getDataAPI, result, setResult } = useContext(AppContext);

  // getDataAPI({
  //   url: "http://localhost:3000/posts/",
  // });
  // console.log(data);
  const [allPosts, setAllPosts] = useState(null);
  useEffect(
    () =>
      getDataAPI({
        url: "http://localhost:3000/posts/",
      }).then((data) => setAllPosts(data)),
    []
  );

  console.log("allPosts index.js : ", allPosts);

  // if (!allPosts || allPosts.errors) {
  //   return "Loading...";
  // }
  // console.log("allPosts index.js : ", allPosts);
  return (
    <DisplayerPage>
      <div className="listpost">
        <h2>Les posts </h2>

        {allPosts &&
          allPosts.map((post) => (
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
