import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Watch from "./Screens/Watch";
import User from "./Screens/User";
import Playlist from "./Screens/Playlist";
import LikeVideos from "./Screens/LikeVideos";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} index/>
      <Route path="/Search/:id" element={<Home/>}/>
      <Route path="/Playlist" element={<Playlist/>}/>
      <Route path="/Likes" element={<LikeVideos/>}/>
      <Route path="/Watch/:id" element={<Watch/>}/>
      <Route path="/User/:id" element={<User/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;