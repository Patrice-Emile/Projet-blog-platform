import DisplayerPage from "../../src/components/DisplayerPage";
import FormConnexion from "../../src/components/FormConnexion";
import AppContext from "../../src/components/AppContext";
import { useContext, useEffect } from "react";
import Router from "next/router";

const SignUp = (props) => {
  const { user, success } = useContext(AppContext);

  useEffect(() => {
    if (user || success) {
      setTimeout(() => {
        Router.push("/");
      }, 2000);
    }
  }, [user, success]);
  return (
    <DisplayerPage>
      {user ? (
        <>{success && <div className="success">{success}</div>}</>
      ) : (
        <>
          <h1>Sign Up</h1>
          <FormConnexion isSignUpPage={true} />
        </>
      )}
    </DisplayerPage>
  );
};

export default SignUp;
