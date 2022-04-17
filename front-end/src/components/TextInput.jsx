import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="textInputDiv">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
    </div>
  );
};
export default TextInput;
