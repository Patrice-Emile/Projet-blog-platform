import DisplayerPage from "../../src/components/DisplayerPage";
import FormConnexion from "../../src/components/FormConnexion";

const SignIn = () => {
  return (
    <DisplayerPage>
      <h1>Connexion</h1>
      <FormConnexion isSignUpPage={false} />
    </DisplayerPage>
  );
};

export default SignIn;
