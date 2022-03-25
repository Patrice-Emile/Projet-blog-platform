import React from "react";
import { Formik, Form } from "formik";
import yupSchema from "../functions/yupSchema";
import TextInput from "./TextInput";
import AppContext from "./AppContext";
import { useContext } from "react";

// And now we can use these
const FormConnexion = (props) => {
  const { isSignUpPage, ...otherProps } = props;
  const { postDataAPI } = useContext(AppContext);

  const handleSubmit = (values, { setSubmitting }) => {
    if (values.password === values.confirmPassword) {
      const test = postDataAPI({
        url: "http://localhost:3000/sign-up",
        data: values,
      });
      console.log("It time to post some shit u know\n", test);

      setSubmitting(true);
    }
    setSubmitting(false);
    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          email: "",
        }}
        // validationSchema={yupSchema}
        onSubmit={isSignUpPage ? handleSubmit : () => console.log("SignInPage")}
      >
        <Form>
          <TextInput
            label="Email Address"
            name="email"
            type="text"
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
