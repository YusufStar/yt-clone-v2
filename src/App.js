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
    element: <Search />,
  },
  {
    path: "/Subscriptions",
    element: <Home />,
  },
  {
    path: "/History",
    element: <Home />,
  },
  {
    path: "/Playlist",
    element: <Home />,
  },
  {
    path: "/Likes",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;