import React from "react";
import AppContext from "./AppContext";
import User from "./User";
import { useContext, useState, useEffect } from "react";
import Router from "next/router";
// And now we can use these
const ListUsers = (props) => {
  const { ...otherProps } = props;
  const { getDataAPI, user } = useContext(AppContext);

  const [allUsers, setAllUsers] = useState(null);

  // console.log(user);
  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.role !== "ADMIN") {
      Router.push("/");
      return;
    }

    getDataAPI({
      url: "http://localhost:3000/users",
      headers: { authentication: user.token },
    }).then((data) => {
      console.log(data);
      setAllUsers(data);
      console.log(allUsers);
    });
  }, []);
  console.log("allUsers : ", allUsers);
  return (
    <div {...otherProps}>
      {allUsers &&
        allUsers.map((oneUser) => (
          <>
            <User
              setAllUsers
              className="user"
              key={oneUser.id}
              id={oneUser.id}
              active={oneUser.active}
              name={oneUser.name}
              email={oneUser.email}
              role={oneUser.role}
              created_at={oneUser.created_at}
              updated_at={oneUser.updated_at}
            />
          </>
        ))}
    </div>
  );
};

export default ListUsers;
