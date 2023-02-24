import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";

export default function HomePage() {
  const { dispatch } = useContext(UserContext);
  return (
    <div>
      <div>{process.env.NODE_ENV}</div>
      <h1 className="text-3xl font-bold text-red-500 underline">
        Hello world!
      </h1>
      <button
        onClick={() => {
          Cookies.set("userInfo", null);
          dispatch({ type: "USER_LOGOUT" });
        }}
      >
        logout
      </button>
    </div>
  );
}
