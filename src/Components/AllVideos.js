import React from "react";
import VideoBox from "./VideoBox";
import { videos } from "../Data";

const AllVideos = () => {
  return (
    <div className="h-full w-full pl-[240px] pt-8 flex flex-wrap px-12">
      {videos?.map((video) => {
        return <VideoBox video={video}/>;
      })}
    </div>
  );
};

export default AllVideos;