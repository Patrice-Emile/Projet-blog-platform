import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DisplayerPage from "../../../src/components/DisplayerPage";
import FormPost from "../../../src/components/FormPost";
import AppContext from "../../../src/components/AppContext";
import Router from "next/router";

const EditPostPage = (props) => {
  // GET POST ID
  const {
    query: { id, title, content },
  } = useRouter();

  const { user } = useContext(AppContext);
  useEffect(() => {
    if (!user || user.role === "READER") {
      Router.push("/");
      return;
    }
  }, [user]);

  return (
    <DisplayerPage>
      <div>
        {user && (
          <FormPost className="formPost" key={id} author={user.name} id={id} />
        )}
      </div>
    </DisplayerPage>
  );
};

export default EditPostPage;
