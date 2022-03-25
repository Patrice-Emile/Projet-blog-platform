import Button from "../../src/components/Button";
import DisplayerPage from "../../src/components/DisplayerPage";

const AdminPage = (props) => {
  return (
    <DisplayerPage>
      <h1>admin</h1>
      <h1>
        Afficher les infos des users, permettre de désactiver et de modif de
        role,afficher dans tableau, verif si admin
      </h1>
      <p>
        <Button variant="secondary" size="lg">
          SAVE
        </Button>
      </p>
    </DisplayerPage>
  );
};

export default AdminPage;
