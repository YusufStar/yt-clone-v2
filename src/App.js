import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import Home from "./Screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;