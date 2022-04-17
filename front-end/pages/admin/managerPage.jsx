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
          <h2>Manage your platform's users</h2>
          <ListUsers />
        </>
      )}
    </DisplayerPage>
  );
};

export default AdminPage;
