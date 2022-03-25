import DisplayerPage from "../../src/components/DisplayerPage";
import AppContext from "../../src/components/AppContext";
import FormConnexion from "../../src/components/FormConnexion";
import { useEffect, useContext } from "react";

const SignUp = (props) => {
  // useEffect(
  //   () =>
  //     postDataAPI({
  //       url: "http://localhost:3000/sign-up",
  //       data,
  //     }),
  //   []
  // );
  return (
    <DisplayerPage>
      <h1>Inscription</h1>
      <FormConnexion isSignUpPage={true} />
    </DisplayerPage>
  );
};

export default SignUp;
