import React, { useRef } from "react";
import VideoBox from "./VideoBox";

const AllVideos = ({ data }) => {
  return (
    <div className="h-full w-full pl-[240px] pt-8 flex flex-wrap px-12">
      {data &&
        Object.keys(data?.videos)?.map((key) => {
          const video = data.videos[key];
          return <VideoBox key={key} video={video} id={key} />;
        })}
    </div>
  );
};

export default AllVideos;