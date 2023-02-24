import React, { createContext, useReducer } from "react";
import Cookie from "js-cookie";

export const UserContext = createContext();

const initialState = {
  userInfo: Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
