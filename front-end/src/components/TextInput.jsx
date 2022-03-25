import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="textInputDiv">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={meta.touched && meta.error ? "textInputError" : ""}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextInput;
