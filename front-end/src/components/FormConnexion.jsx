import React from "react";
import { Formik, Form, useField } from "formik";
import yupSchema from "../functions/yupSchema";
import TextInput from "./TextInput";
import AppContext from "./AppContext";
import { useContext, useState, useCallback, useEffect } from "react";

// And now we can use these
const FormConnexion = (props) => {
  const { isSignUpPage, ...otherProps } = props;
  const { postDataAPI, error, setError, setSuccess } = useContext(AppContext);
  const [loadError, setLoadError] = useState(false);

  const handleSubmitPortal = useCallback(
    (values, { setSubmitting }) => {
      console.log(values);
      console.log(error);
      setSuccess(null);
      if (isSignUpPage) {
        if (values.password !== values.confirmPassword) {
          setError("Your password and your confirm password aren't the same !");
          return;
        }
      }

      const url = isSignUpPage
        ? "http://localhost:3000/sign-up"
        : "http://localhost:3000/sign-in";
      postDataAPI(
        {
          url: url,
          data: { email: values.email, password: values.password },
        },
        true
      );

      setSubmitting(true);
    },
    [postDataAPI, setLoadError]
  );
  useEffect(() => {
    if (error) setLoadError(true);
  });
  return (
    <>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          email: "",
        }}
        validationSchema={yupSchema}
        onSubmit={handleSubmitPortal}
      >
        <Form {...otherProps}>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="YaPasWsh@blog.com"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="**********"
          />
          {isSignUpPage && (
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="**********"
            />
          )}
          {loadError && error && <div className="error">{error}</div>}
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

export default FormConnexion;
