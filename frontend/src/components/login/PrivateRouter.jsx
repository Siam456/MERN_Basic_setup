import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function PrivateRouter() {
  const { state } = useContext(UserContext);

  return state?.userInfo?.token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
}
