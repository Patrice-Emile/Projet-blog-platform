import DisplayerPage from "../src/components/DisplayerPage";
import FormProfile from "../src/components/FormProfile";
import AppContext from "../src/components/AppContext";
import { useContext, useEffect } from "react";
import Router from "next/router";

const ProfilePage = () => {
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (user === null) {
      Router.push("/");
      return;
    }
  }, [user]);

  return (
    <DisplayerPage>
      <div>
        {user && (
          <FormProfile
            className="formPost"
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
          />
        )}
      </div>
    </DisplayerPage>
  );
};

export default ProfilePage;
