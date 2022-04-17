import DisplayerPage from "../src/components/DisplayerPage";
import FormPost from "../src/components/FormPost";
import AppContext from "../src/components/AppContext";
import { useContext, useEffect } from "react";
import Router from "next/router";

const PostsPage = () => {
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (!user || user.role === "READER") {
      Router.push("/");
      return;
    }
  }, [user]);

  return (
    <DisplayerPage>
      <div>{user && <FormPost author={user.name} addPost={true} />}</div>
    </DisplayerPage>
  );
};

export default PostsPage;
