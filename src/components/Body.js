import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Body = () => {
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <div className="overflow-x-hidden m-0">
      <RouterProvider router={approuter} />
    </div>
  );
};

export default Body;
