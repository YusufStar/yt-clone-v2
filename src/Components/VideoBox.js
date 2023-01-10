import React from "react";
import { useNavigate } from "react-router-dom";

const VideoBox = ({ video, id }) => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/Watch/${id}`)} className="flex flex-col relative h-full max-h-[345px] min-h-[300px] mx-2 mb-10 thumb max-w-[360px] min-w-[300px]">
      <a href="" className="w-full relative">
        <img
          src={video.banner}
          className="w-full min-h-[200px] max-h-[210px] rounded-xl"
        />
        <p className="absolute right-1 bottom-3 text-white text-xs py-[3px] px-[4px] h-[24px] rounded-[4px] bg-black">
          50:17
        </p>
      </a>

      <div className="flex justify-between pt-2">
        <div className="w-9 h-full">
          <img
            src={video.channelProfile}
            className="w-full h-9 rounded-full"
          />
        </div>
        <div className="w-[90%] flex flex-col gap-3 pl-3">
          <h1 className="text-white font-[500]">
            {video.videoName.slice(0, 39)}
          </h1>
          <p className="text-sm text-[#aaa] font-medium leading-[1px]">
            {video.channelName}
          </p>
          <p className="text-sm text-[#aaa] font-medium">
            {video.view} • {new Date(Number(video.date)).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;