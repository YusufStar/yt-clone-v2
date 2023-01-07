import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import AllVideos from "../Components/AllVideos";
import { useParams } from "react-router-dom";

const Home = () => {
  const {id} = useParams()
  
  return (
    <div className="h-auto min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar defaultSearchText={id ? id : ""}/>
      <div className="flex h-full pt-16 bg-[#0f0f0f]">
        <SideBar />
        <AllVideos />
      </div>
    </div>
  );
};

export default Home;