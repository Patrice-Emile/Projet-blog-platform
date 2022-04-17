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
      <>
        {user && (
          <FormPost className="formPost" author={user.name} addPost={true} />
        )}
      </>
    </DisplayerPage>
  );
};

export default PostsPage;
