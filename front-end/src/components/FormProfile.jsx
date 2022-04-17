import React from "react";
import { Formik, Form, useField } from "formik";
import yupSchema from "../functions/yupSchema";
import TextInput from "./TextInput";
import AppContext from "./AppContext";
import { useContext, useState, useEffect } from "react";

// And now we can use these
const FormProfile = (props) => {
  const { id, name, email, role, ...otherProps } = props;
  const { putDataAPI, user, error, setError, success, setSuccess } =
    useContext(AppContext);
  const [loadError, setLoadError] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  const handleSubmitProfilePage = (values, { setSubmitting }) => {
    setError(null);
    setSuccess(null);
    console.log(values);

    if (values.password !== values.confirmPassword) {
      setError("Your password and your confirm password aren't the same !");
      return;
    }

    putDataAPI(
      {
        url: "http://localhost:3000/users/" + id,
        data: {
          new_email: values.email,
          new_password: values.password,
          new_name: values.name,
          confirmPassword: values.confirmPassword,
        },
      },
      true
    );

    setSubmitting(true);

    console.log(user);
  };

  useEffect(() => {
    if (error) setLoadError(true);
    else setLoadSuccess(true);
  });
  return (
    <>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          email,
          name,
        }}
        validationSchema={yupSchema}
        onSubmit={handleSubmitProfilePage}
      >
        <Form>
          <label>Role : {role}</label>

          <TextInput label="Name" name="name" type="text" />
          <TextInput label="Email Address" name="email" type="email" />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="**********"
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="**********"
          />
          {loadError && error && <div className="error">{error}</div>}
          {loadSuccess && success && <div className="success">{success}</div>}
          <div>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default FormProfile;
