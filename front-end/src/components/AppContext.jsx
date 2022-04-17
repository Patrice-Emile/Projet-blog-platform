import { createContext, useState, useEffect } from "react";
import axios from "axios";

console.clear();
const AppContext = createContext({});

const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const deleteUser = (user) => {
  localStorage.removeItem("user");
};

export const AppContextProvider = (props) => {
  const [result, setResult] = useState();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      setLoaded(true);
      return;
    }

    const userData = JSON.parse(data);

    setUser(userData);

    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) {
      return;
    }

    saveUser(user);
  }, [user]);
  // GET DATA
  const getDataAPI = async (options) => {
    const { url, params, headers } = options;
    return await axios
      .get(url, {
        params,
        headers,
      })
      .then((res) => res.data);
  };
  // POST DATA
  const postDataAPI = async (options, setUserData = false) => {
    const { url, data, headers } = options;

    return axios.post(url, data, { headers: headers }).then((res) => {
      setErrorOrSuccess(res.data, setUserData);
    });
  };

  const putDataAPI = async (options, setUserData = false) => {
    const { url, data } = options;
    return axios
      .put(url, data, { headers: { authentication: user.token } })
      .then((res) => setErrorOrSuccess(res.data, setUserData));
  };
  const deleteDataAPI = async (options) => {
    const { url, params, headers } = options;
    return axios
      .delete(url, {
        params,
        headers,
      })
      .then((res) => setErrorOrSuccess(res.data, false));
  };
  const setErrorOrSuccess = (data, setUserData) => {
    if (!data.errors) {
      if (setUserData) {
        saveUser(data);
        setUser(data);
        setSuccess("Your request was successful, my lord !");
      } else {
        setResult(data);
      }
    } else {
      setError(
        data.errors.map((messages) => (
          <>
            <br />
            {messages}
          </>
        ))
      );
    }
  };
  return (
    <AppContext.Provider
      {...props}
      value={{
        result,
        setResult,
        user,
        setUser,
        error,
        setError,
        success,
        setSuccess,
        loaded,
        setLoaded,
        getDataAPI,
        postDataAPI,
        deleteDataAPI,
        putDataAPI,
      }}
    />
  );
};

export default AppContext;
