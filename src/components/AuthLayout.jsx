//this component to protect routes
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  //ask store is any logged in ?
  const authStatus = useSelector((state) => state.auth.status);

  //this will tell where you go if logged in go home else login
  // we will check if any three of those change check Authenticated again
  useEffect(() => {
    //TODO: make it more easy
    //that means this will default true (authentication) and (authStatus)

    // eg true && false !== true ---> true (login karo)
    // true && true !== true --> false
    if (authentication && authStatus != authentication) {
      navigate("/login");
    }
    // !(auth )->false
    // false && true !== false --> true (home)
    // false && false !== false --> false
    else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading..</h1> : <>{children}</>;
}