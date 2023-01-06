import React from "react";

const VideoBox = () => {
  return (
    <div className="flex flex-col relative h-full max-h-[345px] min-h-[300px] mx-2 mb-10 thumb max-w-[360px] min-w-[320px]">
      <a href="/watch/test" className="w-full relative">
        <img
          src="https://i.ytimg.com/vi/3jn5ac6VqIw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAUCHHEDAz2KYACOB1tOWaIsq78VQ"
          className="w-full min-h-[200px] max-h-[210px] rounded-xl"
        />
        <p className="absolute right-1 bottom-3 text-white text-xs py-[3px] px-[4px] h-[12px] rounded-[4px] bg-black">
          50:17
        </p>
      </a>

      <div className="flex justify-between pt-2">
        <div className="w-9 h-full">
          <img
            src="https://yt3.ggpht.com/ytc/AMLnZu8XOi2GNeyS7qrqWF19YOy4stIZ7Cfp9YSwdYfdkQ=s68-c-k-c0x00ffffff-no-rj"
            className="w-full h-9 rounded-full"
          />
        </div>
        <div className="w-[90%] flex flex-col gap-3 pl-3">
          <h1 className="text-white font-[500]">Müdür Ne’aptın 7. Bölüm | Savaş Pilotu</h1>
          <p className="text-sm text-[#aaa] font-medium leading-[1px]">25 Film</p>
          <p className="text-sm text-[#aaa] font-medium">981 B görüntülenme • 4 yıl önce</p>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;