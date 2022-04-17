import React from "react";
import { Formik, Form, Field } from "formik";
import AppContext from "./AppContext";
import { useContext, useState, useEffect } from "react";
import formattedDate from "../functions/formattedDate";

// And now we can use these
const User = (props) => {
  const {
    setAllUsers,
    id,
    active,
    name,
    email,
    role,
    created_at,
    updated_at,
    ...otherProps
  } = props;
  const { putDataAPI, error, setError, success } = useContext(AppContext);
  const [loadError, setLoadError] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  const handleSubmitUser = (values, { setSubmitting }) => {
    setError(null);
    console.log("values : ", values);
    putDataAPI({
      url: "http://localhost:3000/change-user-role-activity/" + id,
      data: {
        new_role: values.role,
        active: parseInt(values.active),
      },
    });

    setSubmitting(true);
  };

  useEffect(() => {
    if (error) setLoadError(true);
    else setLoadSuccess(true);
  });
  return (
    <>
      <Formik
        initialValues={{ active: active ? "1" : "0", role }}
        onSubmit={handleSubmitUser}
        {...otherProps}
      >
        <Form>
          <div>
            <p>Name :{name}</p>
            <p>Email :{email}</p>
            <p>Created :{formattedDate(new Date(created_at))}</p>
            {updated_at && (
              <p>Last updated :{formattedDate(new Date(updated_at))}</p>
            )}
          </div>
          <div>
            <label htmlFor={id}>Role</label>
            <Field as="select" label="Role" name="role">
              <option selected={role === "ADMIN" ? true : false} value="ADMIN">
                ADMIN
              </option>
              <option
                selected={role === "AUTHOR" ? true : false}
                value="AUTHOR"
              >
                AUTHOR
              </option>
              <option
                selected={role === "READER" ? true : false}
                value="READER"
              >
                READER
              </option>
            </Field>

            <label htmlFor={id}>Status</label>
            <Field as="select" name="active">
              <option selected={active ? true : false} value="1">
                Active
              </option>
              <option selected={!active ? true : false} value="0">
                Inactive
              </option>
            </Field>
          </div>
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

export default User;
