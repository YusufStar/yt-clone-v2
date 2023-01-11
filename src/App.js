import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import Home from "./Screens/Home";
import Watch from "./Screens/Watch";
import User from "./Screens/User";
import Playlist from "./Screens/Playlist";
import LikeVideos from "./Screens/LikeVideos";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/Search/:id",
    element: <Home />,
  },
  {
    path: "/Playlist",
    element: <Playlist />,
  },
  {
    path: "/Likes",
    element: <LikeVideos />,
  },
  {
    path: "/Watch/:id",
    element: <Watch />,
  },
  {
    path: "/User/:id",
    element: <User/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;