import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  const auth =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  if (
    auth === "" &&
    (location.pathname.includes("/overview") ||
      location.pathname.includes("/user") ||
      location.pathname.includes("/patient") ||
      location.pathname.includes("/visitation") ||
      location.pathname.includes("/medicine") ||
      location.pathname.includes("/medical-record"))
  ) {
    return <Navigate to="/login" />;
  } else if (
    auth !== "" &&
    auth.level === "Pasien" &&
    (location.pathname.includes("/overview") ||
      location.pathname.includes("/user") ||
      location.pathname.includes("/patient") ||
      location.pathname.includes("/visitation") ||
      location.pathname.includes("/medicine") ||
      location.pathname.includes("/medical-record"))
  ) {
    return <Navigate to="/access-denied" />;
  } else if (
    auth !== "" &&
    (auth.level === "Admin" || auth.level === "Dokter")
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="/page-not-found" />;
  }
};

export default PrivateRoutes;
