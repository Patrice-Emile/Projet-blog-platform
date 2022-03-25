import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

// console.clear();
const AppContext = createContext({});

const save = (postList) => {
  localStorage.setItem("postlist", JSON.stringify(postList));
};

export const AppContextProvider = (props) => {
  const [result, setResult] = useState();
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  // GET DATA
  const getDataAPI = async (options) => {
    const { url, params } = options;
    return await axios
      .get(url, {
        params,
      })
      .then((res) => res.data);
  };
  // POST DATA
  const postDataAPI = async (options) => {
    const { url, data } = options;

    console.log("url : ", url);
    console.log("data : ", data);
    return axios
      .post(url, {
        data,
      })
      .then((res) => setUser({ user: data, token: res.data }));
  };

  const putDataAPI = async (options) => {
    const { url, params } = options;
    return axios
      .put(url, {
        params,
      })
      .then((res) => res.data);
  };
  const deleteDataAPI = async (options) => {
    const { url, params } = options;
    return axios
      .delete(url, {
        params,
      })
      .then((res) => res.data);
  };
  return (
    <AppContext.Provider
      {...props}
      value={{
        result,
        setResult,
        user,
        setUser,
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
