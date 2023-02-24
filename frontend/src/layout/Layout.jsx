import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../routers";

export default function Layout() {
  return (
    <div>
      <Routes>
        {routes.map((route, i) => {
          return route.component ? (
            <Route
              key={i}
              path={`${route.path}`}
              element={<route.component />}
            />
          ) : null;
        })}
      </Routes>
    </div>
  );
}
