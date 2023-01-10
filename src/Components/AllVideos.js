import React from "react";
import VideoBox from "./VideoBox";

const AllVideos = ({ data, id }) => {
  return (
    <div className="h-full w-full pt-8 flex flex-wrap px-12">
      {
        Object.keys({...data?.videos})
        ?.filter((key) => {
          const video = data.videos[key];
          if(!id) {
            return key
        } else if (video?.videoName?.toLowerCase().includes(id?.toLowerCase())) {
          return key
        }
        })
        .map((key) => {
          const video = data.videos[key];
          return <VideoBox key={key} video={video} id={key} />;
        })}
    </div>
  );
};

export default AllVideos;