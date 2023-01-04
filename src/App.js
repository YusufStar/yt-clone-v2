import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import Home from "./Screens/Home";
import Search from "./Screens/Search";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/Search/:id",
    index: true,
    element: <Search />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;