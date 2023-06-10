import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesPatient = () => {
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  if (auth === "") {
    return <Navigate to="/login" />;
  } else if (auth !== "" && auth.level === "Pasien") {
    return <Outlet />;
  }
};

export default PrivateRoutesPatient;
