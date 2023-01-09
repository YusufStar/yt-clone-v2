import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import AllVideos from "../Components/AllVideos";
import { useParams } from "react-router-dom";
import { child, get, ref } from "firebase/database";
import { database } from "../FirebaseConfig";

const Home = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const dbref = ref(database);
    get(child(dbref, `/`)).then((snap) => {
      if (snap.exists()) {
        setData(snap.val())
      } else {
        setData(null)
      }
    });
  }, []);

  return (
    <div className="h-auto min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar defaultSearchText={id ? id : ""} />
      <div className="flex h-full pt-16 bg-[#0f0f0f]">
        <SideBar />
        {data && <AllVideos data={data}/>}
      </div>
    </div>
  );
};

export default Home;