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

  const array = new Array(15)

  return (
    <div className="h-auto min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar defaultSearchText={id ? id : ""} />
      <div className="flex w-full flex-wrap h-full pt-16 bg-[#0f0f0f]">
        <SideBar />
        <div className="w-full h-full flex flex-wrap gap-3 pl-[240px]">
        {data ? (
          <AllVideos id={id} data={data}/>
        ) : (
          <>
          <LoadingBox/>
          <LoadingBox/>
          <LoadingBox/>
          <LoadingBox/>
          <LoadingBox/>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

function LoadingBox () {
  return (
    <div className="flex flex-col relative h-full max-h-[345px] min-h-[300px] mx-2 mb-10 thumb max-w-[360px] min-w-[300px]">
      <a href="" className="w-full relative">
        <div
          className="w-full min-h-[200px] bg-[#272727] max-h-[210px] rounded-xl"
        />
        <p className="absolute right-1 bottom-3 text-white text-xs py-[3px] px-[4px] h-[20px] w-[40px] rounded-[4px] bg-black">
        </p>
      </a>

      <div className="flex justify-between pt-2">
        <div className="w-9 h-full">
          <div
            className="w-full bg-[#272727] h-9 rounded-full"
          />
        </div>
        <div className="w-[90%] flex flex-col gap-3 pl-3">
          <h1 className="text-white font-[500] w-full py-1 bg-[#272727]">
          </h1>
          <p className="text-sm text-[#aaa] font-medium w-full py-1 leading-[1px] bg-[#272727]">
          </p>
          <p className="text-sm text-[#aaa] font-medium w-full py-1 bg-[#272727]">
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home;