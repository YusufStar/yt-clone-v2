import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import { database } from "../FirebaseConfig";

const Playlist = () => {
  const { user } = useSelector((state) => state.Auth);
  const [savedVideos, setSavedVideos] = useState(null)
  const [keys, setKeys] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
      const dbref = ref(database);
      get(child(dbref, `/`)).then((snap) => {
          if (snap.exists) {
              const saveVid = []
              const videos = snap.val()?.videos
              const filteredDat = Object.keys(videos)?.filter((video) => {
            return snap.val()?.Channels[user?.uid]?.savedVideo?.includes(snap.val().videos[video]?.id)
        })
        filteredDat.forEach((key) => {
          setKeys([...keys, key])
            saveVid.push({
                ...snap.val().videos[key]
            })
        })
        setSavedVideos(saveVid)
      }
    });
  }, []);

  return (
    <div className="h-screen bg-[#0f0f0f] flex flex-col ">
      <Navbar />
      <div className="flex w-full pr-6 pt-16 h-full flex-col min-h-full">
        <SideBar />
        <div className="w-full h-full flex flex-col gap-3 pl-[240px]">
            {savedVideos && savedVideos.map((video, key) => {
                return (
                <div key={key} onClick={() => navigate(`/Watch/${keys[key]}`)} className="py-4 cursor-pointer w-full rounded-xl px-3 hover:bg-[#272727] flex items-center">
                    <img src={video?.banner} className="w-[160px] h-[90px] rounded-xl" />
                    <div className="flex flex-col h-full items-start pl-4">
                        <h1 className="w-auto max-w-full">{video?.videoName}</h1>
                        <p className="text-sm text-[#aaa] font-semibold pt-2">
                            {video?.channelName} • {video?.view} görüntülenme • {new Date(Number(video?.date)).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )})}
        </div>
      </div>
    </div>
  );
};

export default Playlist;