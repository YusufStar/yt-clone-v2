import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Channels, videos } from "../Data";
import Slider from "@mui/material/Slider";
import screenfull from "screenfull";
import { useSelector } from "react-redux";

const Watch = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.Auth);
  const video = videos.find((video) => video.id === id);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const bufferRef = useRef(null);
  const navigate = useNavigate();
  const channelInfo = Channels.find(
    (channel) => channel.name === video.channelName
  );
  const [isSubTheChannel, SetIsSubTheChannel] = useState(
    channelInfo.subscribers.includes(user?.uid)
  );

  {
    /* States */
  }
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const playVideo = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const muteVideo = () => {
    mute ? (videoRef.current.volume = 1) : (videoRef.current.volume = 0);
    mute ? setVolume(1) : setVolume(0);
    setMute(!mute);
  };

  const changeVolume = (newValue) => {
    if (newValue === 0) {
      setMute(true);
    } else {
      setMute(false);
    }
    setVolume(newValue);
    videoRef.current.volume = newValue;
  };

  const element = videoRef.current;

  const onProgress = () => {
    if (isPlaying) {
      if (!element.buffered || !bufferRef.current) return;
      if (!element.buffered.length) return;
      const bufferedEnd = element.buffered.end(element.buffered.length - 1);
      const duration = element.duration;
      if (isPlaying) {
        if (bufferRef && duration > 0) {
          bufferRef.current.style.width = (bufferedEnd / duration) * 100 + "%";
        }
      }
    }
  };

  const onTimeUpdate = () => {
    setIsLoading(false);
    if (!element.buffered || !progressRef.current) return;
    const duration = element.duration;
    if (progressRef && duration > 0) {
      progressRef.current.style.width =
        (element.currentTime / duration) * 100 + "%";
    }
  };

  const formatTime = (duration) => {
    const ONE_SECOND = 60;
    const minutes = Math.floor(parseInt(duration / ONE_SECOND));
    const seconds = Math.floor(duration - minutes * ONE_SECOND);

    const formattedTime = `${tenPad(minutes)}:${tenPad(seconds)}`;
    return formattedTime;
  };

  const tenPad = (time) => {
    if (time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  };

  const handleFullScreen = () => {
    if (isFullScreen) {
      screenfull.exit();
    } else {
      screenfull.request();
    }
    setIsFullScreen(!isFullScreen);
  };

  const TextFormatter = (tweet) => {
    tweet = tweet
      .replace(/@([\w]+)/g, "<span id='hash'>@$1</span>")
      .replace(/#([\wşçöğüıİ]+)/gi, "<span id='hash'>#$1</span>")
      .replace(/(https?:\/\/[\w\.\/]+)/, "<span>$1</span>")
      .replace(/\n/g, "<br />");
    return tweet;
  };

  const isSub = (uid) => {
    const channelInfo = Channels.find(
      (channel) => channel.name === video.channelName
    );
    const result = channelInfo.subscribers.includes(uid);
    return result;
  };

  const HandleSub = () => {
    const channelInfo = Channels.find(
      (channel) => channel.name === video.channelName
    );
    if (!isSub(user?.uid)) {
      {
        /* Abone Ol */
      }
      channelInfo.subscribers.push(user?.uid);
      SetIsSubTheChannel(true);
    } else {
      {
        /* Abonelikten çık */
      }
      channelInfo.subscribers.splice(user?.uid, 1);
      SetIsSubTheChannel(false);
    }
    console.log(channelInfo.subscribers);
  };

  useEffect(() => {
    const el = document.getElementById("hash")
    if(el) {
    el.addEventListener("click", () => {
      navigate(`/User/${Channels.find((channel) => channel.name === el?.innerHTML.replace("#", "")).name}`)
    });
  }
  }, []);

  return (
    <div className="w-full relative h-full min-h-screen overflow-y-auto bg-[#0f0f0f] flex flex-col">
      <Navbar />
      <div className="flex w-full px-24 pt-20 h-full flex-col min-h-full">
        <div
          className={`${
            isFullScreen
              ? "absolute w-full h-full p-0 top-0 left-0 right-0 bottom-0 z-30"
              : "relative w-[1280px] h-[720pxpx]"
          }`}
        >
          {/* Video */}
          <video
            ref={videoRef}
            onCanPlayThrough={() => {
              setIsLoading(false);
              setVideoDuration(videoRef.current.duration);
            }}
            onTimeUpdate={() => {
              setCurrentTime(videoRef.current.currentTime);
              onTimeUpdate();
            }}
            onEnded={() => setIsPlaying(false)}
            onWaiting={() => setIsLoading(true)}
            onProgress={() => onProgress()}
            className={`${
              isFullScreen ? "w-full h-full" : "w-[1280px] h-[720px]"
            }`}
          >
            <source src={video.video} type="video/mp4" />
          </video>
          <div className="">{isLoading && "Loading"}</div>

          {/* Overlay */}
          <div className="absolute left-0 right-0 bottom-0 w-full h-auto flex flex-col justify-end items-center">
            {/* Progress Bar */}
            <div className="h-[3px] border-transparent bg-white/25 w-[98%] mx-auto relative">
              <div
                className={`w-0 h-full absolute bg-[#FF0000] z-20`}
                ref={progressRef}
              ></div>
              <div
                className={`w-0 h-full absolute bg-white/50 z-10`}
                ref={bufferRef}
              ></div>
            </div>

            {/* Video Controls */}
            <div className="w-[98%] mx-auto flex items-center">
              <div className="gradient-custom" />
              <button onClick={playVideo} className="w-12 h-12 px-[2px]">
                {!isPlaying ? (
                  <svg
                    height="100%"
                    version="1.1"
                    viewBox="0 0 36 36"
                    width="100%"
                  >
                    <path
                      fill="white"
                      d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
                      id="ytp-id-2752"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    height="100%"
                    version="1.1"
                    viewBox="0 0 36 36"
                    width="100%"
                  >
                    <path
                      fill="white"
                      className="ytp-svg-fill"
                      d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
                      id="ytp-id-2763"
                    ></path>
                  </svg>
                )}
              </button>
              <button onClick={muteVideo} className="w-12 h-12 px-[2px]">
                {!mute ? (
                  <svg
                    height="100%"
                    version="1.1"
                    viewBox="0 0 36 36"
                    width="100%"
                  >
                    <use className="ytp-svg-shadow"></use>
                    <use className="ytp-svg-shadow"></use>
                    <defs>
                      <clipPath id="ytp-svg-volume-animation-mask">
                        <path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path>
                        <path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path>
                        <path
                          className="ytp-svg-volume-animation-mover"
                          d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z"
                          transform="translate(0, 0)"
                        ></path>
                      </clipPath>
                      <clipPath id="ytp-svg-volume-animation-slash-mask">
                        <path
                          className="ytp-svg-volume-animation-mover"
                          d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z"
                          transform="translate(0, 0)"
                        ></path>
                      </clipPath>
                    </defs>
                    <path
                      className="ytp-svg-fill ytp-svg-volume-animation-speaker"
                      clipPath="url(#ytp-svg-volume-animation-mask)"
                      d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
                      fill="#fff"
                      id="ytp-id-15"
                    ></path>
                    <path
                      className="ytp-svg-fill ytp-svg-volume-animation-hider"
                      clipPath="url(#ytp-svg-volume-animation-slash-mask)"
                      d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z"
                      fill="#fff"
                      id="ytp-id-16"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    height="100%"
                    version="1.1"
                    viewBox="0 0 36 36"
                    width="100%"
                  >
                    <use className="ytp-svg-shadow"></use>
                    <path
                      fill="white"
                      className="ytp-svg-fill"
                      d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"
                      id="ytp-id-46"
                    ></path>
                  </svg>
                )}
              </button>
              <Slider
                min={0}
                max={1}
                step={0.02}
                sx={{ width: "100px", color: "#eee", marginLeft: "8px" }}
                size="small"
                value={volume}
                onChange={(e) => changeVolume(e.target.value)}
              />
              <p className="inline-block text-white ml-6 text-[13px]">
                {formatTime(currentTime)} / {formatTime(videoDuration)}
              </p>

              <button
                className="px-[2px] w-12 h-12 ml-auto"
                onClick={() => handleFullScreen()}
              >
                <svg
                  height="100%"
                  version="1.1"
                  viewBox="0 0 36 36"
                  fill="white"
                  width="100%"
                >
                  <g className="ytp-fullscreen-button-corner-0">
                    <use className="ytp-svg-shadow"></use>
                    <path
                      className="ytp-svg-fill"
                      d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
                      id="ytp-id-97"
                    ></path>
                  </g>
                  <g className="ytp-fullscreen-button-corner-1">
                    <use className="ytp-svg-shadow"></use>
                    <path
                      className="ytp-svg-fill"
                      d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
                      id="ytp-id-98"
                    ></path>
                  </g>
                  <g className="ytp-fullscreen-button-corner-2">
                    <use className="ytp-svg-shadow"></use>
                    <path
                      className="ytp-svg-fill"
                      d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
                      id="ytp-id-99"
                    ></path>
                  </g>
                  <g className="ytp-fullscreen-button-corner-3">
                    <use className="ytp-svg-shadow"></use>
                    <path
                      className="ytp-svg-fill"
                      d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
                      id="ytp-id-100"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Video About Section */}
        <div className="w-full h-full flex flex-col">
          <h1
            className="text-[20px] font-semibold formatText my-3"
            dangerouslySetInnerHTML={{ __html: TextFormatter(video.videoName) }}
          />
          {/* Channel Info */}
          <div className="w-full h-auto flex items-center">
            <img
              src={video.channelProfile}
              className="w-[40px] h-[40px] rounded-full"
            />
            <h1 className="flex flex-col justify-start ml-3 items-start h-auto w-auto">
              <span className="text-white font-semibold">
                {video.channelName}
              </span>
              <span className="text-[#aaa] text-sm">{video.view} abone</span>
            </h1>
            {/* Abone Ol Butonu */}
            <button
              className={`
            ${
              !isSub(user?.uid)
                ? "w-[90px] py-2 bg-white rounded-full text-black text-sm ml-7 hover:opacity-90 font-semibold items-center justify-center"
                : "flex w-[165px] py-2 rounded-full ml-7 bg-[#272727] text-sm font-semibold items-center justify-center hover:bg-[#3f3f3f]"
            }
          `}
              onClick={HandleSub}
            >
              {isSubTheChannel && (
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  class="style-scope yt-icon"
                  style={{
                    pointerEvents: "none",
                    width: "24px",
                    height: "24px",
                    marginRight: 5,
                  }}
                >
                  <g className="style-scope yt-icon">
                    <path
                      fill="white"
                      d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"
                      className="style-scope yt-icon"
                    ></path>
                  </g>
                </svg>
              )}
              {isSubTheChannel ? "Abonelikten Çık" : "Abone Ol"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;