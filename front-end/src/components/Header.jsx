import Link from "next/link";
import AppContext from "./AppContext";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";

const Header = (props) => {
  const { children, ...otherProps } = props;
  const { user, setUser, setError, setSuccess } = useContext(AppContext);
  const handleClickDisconnect = () => {
    setUser(null);
    setError(null);
    setSuccess(null);
    Router.push("/");
  };
  const handleSetErrorAndSetSuccess = () => {
    setError(null);
    setSuccess(null);
  };
  return (
    <header {...otherProps}>
      <Link href="/">
        <h1>{children}</h1>
      </Link>
      <div className="headerButton">
        <Link href="/">
          <button>Home</button>
        </Link>
        {user ? (
          <>
            <Link href="/profile">
              <button>Profile</button>
            </Link>
            {user.role === "ADMIN" && (
              <Link href="/admin/managerPage">
                <button>Manage</button>
              </Link>
            )}
            {user.role !== "READER" && (
              <Link href="/posts">
                <button>Create Post</button>
              </Link>
            )}
            <Link href="/">
              <button onClick={handleClickDisconnect}>Disconnect</button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/portal/sign-in">
              <button onClick={handleSetErrorAndSetSuccess}>Sign in</button>
            </Link>
            <Link href="/portal/sign-up">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
