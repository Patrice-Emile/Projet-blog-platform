import DisplayerPage from "../../src/components/DisplayerPage";
import ListUsers from "../../src/components/ListUsers";
import AppContext from "../../src/components/AppContext";
import { useContext, useEffect } from "react";
import Router from "next/router";

const AdminPage = (props) => {
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (user === null) {
      Router.push("/");
      return;
    }
    if (user.role !== "ADMIN") {
      Router.push("/");
      return;
    }
  }, [user]);
  return (
    <DisplayerPage>
      {user && (
        <>
          <h1>Manage your platform !</h1>
          <ListUsers />
        </>
      )}
    </DisplayerPage>
  );
};

export default AdminPage;
