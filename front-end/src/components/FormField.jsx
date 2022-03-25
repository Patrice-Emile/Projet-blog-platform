import { Field } from "formik";

const FormField = (props) => {
  const { name, type } = props;
  // console.log(name);
  return (
    <>
      <label>
        <p>{name}</p>
        <Field type={type} name={name} />
      </label>
    </>
  );
};

export default FormField;
