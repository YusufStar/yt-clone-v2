import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Channels, videos } from "../Data";
import Slider from "@mui/material/Slider";
import screenfull from "screenfull";
import { useSelector } from "react-redux";
import { child, get, push, ref, remove, set, update } from "firebase/database";
import { database } from "../FirebaseConfig";

const Watch = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.Auth);
  const [data, setData] = useState(null);
  const [video, setvideo] = useState(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const bufferRef = useRef(null);
  const navigate = useNavigate();
  const channelInfo = data?.Channels[video?.uid];
  const isSubTheChannel = channelInfo?.subscribers?.includes(user?.uid);

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
  const [comment, setComment] = useState("");
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const dbref = ref(database);
    get(child(dbref, `/`)).then((snap) => {
      if (snap.exists()) {
        setData(snap.val());
        setvideo(snap.val().videos[id]);
      }
    });
  }, [updateData]);

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
    if (tweet) {
      return tweet
        .replace(/@([\w]+)/g, "<span id='hat'>@$1</span>")
        .replace(/#([\wşçöğüıİ]+)/gi, "<span id='hash'>#$1</span>")
        .replace(/(https?:\/\/[\w\.\/]+)/, "<span>$1</span>")
        .replace(/\n/g, "<br />");
    } else {
      return tweet;
    }
  };

  const isSub = (uid) => {
    const result = channelInfo?.subscribers?.includes(uid);
    return result;
  };

  const HandleSub = () => {
    if (!isSub(user?.uid)) {
      {
        /* Abone Ol */
      }
      set(
        ref(database, `/Channels/${channelInfo?.uid}/subscribers`, user?.uid),
        channelInfo?.subscribers
          ? [...channelInfo?.subscribers, user?.uid]
          : [...[], user?.uid]
      );
      setUpdateData(!updateData);
    } else {
      {
        /* Abonelikten çık */
      }
      remove(
        ref(database, `/Channels/${channelInfo?.uid}/subscribers`, user?.uid)
      );
      setUpdateData(!updateData);
    }
  };

  useEffect(() => {
    const element = document.querySelectorAll("#hat");
    element.forEach((el) => {
      if (el) {
        el.addEventListener("click", () => {
          //navigate(`/User/${user}`)
          const res = Object.keys(data?.Channels).find(
            (key) => data?.Channels[key].name === el.innerHTML.replace("@", "")
          );
          const name = data?.Channels[res].name;
          navigate(`/User/${name}`);
        });
      }
    });
  }, []);

  const handleDislike = () => {
    remove(ref(database, `/Channels/${id}/dislike`, user?.uid));
    video?.like?.includes(user?.uid) &&
      remove(ref(database, `/videos/${id}/like`, user?.uid));
    video?.dislike?.includes(user?.uid)
      ? remove(ref(database, `/Channels/${id}/dislike`, user?.uid))
      : set(
          ref(database, `/videos/${id}/dislike`, user?.uid),
          video?.dislike ? [...video?.dislike, user?.uid] : [...[], user?.uid]
        );
    setUpdateData(!updateData);
  };

  const handleLike = () => {
    video?.dislike?.includes(user?.uid) &&
      remove(ref(database, `/videos/${id}/dislike`, user?.uid));
    video?.like?.includes(user?.uid)
      ? remove(ref(database, `/Channels/${id}/like`, user?.uid))
      : set(
          ref(database, `/videos/${id}/like`, user?.uid),
          video?.like ? [...video?.like, user?.uid] : [...[], user?.uid]
        );
    setUpdateData(!updateData);
  };

  return (
    <div className="w-full relative h-full min-h-screen overflow-y-auto bg-[#0f0f0f] flex">
      <Navbar />
      <div className="flex w-full pl-24 pr-6 pt-20 max-w-[1400px] h-full flex-col min-h-full">
        <div
          className={`${
            isFullScreen
              ? "absolute w-full h-full p-0 top-0 left-0 right-0 bottom-0 z-30"
              : "relative w-[1280px] h-[720px]"
          }`}
        >
          {/* Video */}
          <video
            ref={videoRef}
            onClick={() => playVideo()}
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
            src={video?.video}
          />
          {isLoading && (
            <div className="absolute bg-black/50 w-full h-full top-0 z-50 flex items-center justify-center">
              <svg
                version="1.1"
                fill="#FF0000"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 40 40"
                enableBackground="new 0 0 40 40"
              >
                <path
                  opacity="0.2"
                  fill="#FF0000"
                  d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                />
                <path
                  fill="#FF0000"
                  d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
C22.32,8.481,24.301,9.057,26.013,10.047z"
                >
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="0.5s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          )}

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
                {!isFullScreen ? (
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
                ) : (
                  <svg
                    height="100%"
                    fill="white"
                    version="1.1"
                    viewBox="0 0 36 36"
                    width="100%"
                  >
                    <g className="ytp-fullscreen-button-corner-2">
                      <use className="ytp-svg-shadow"></use>
                      <path
                        className="ytp-svg-fill"
                        d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"
                        id="ytp-id-56"
                      ></path>
                    </g>
                    <g className="ytp-fullscreen-button-corner-3">
                      <use className="ytp-svg-shadow"></use>
                      <path
                        className="ytp-svg-fill"
                        d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"
                        id="ytp-id-57"
                      ></path>
                    </g>
                    <g className="ytp-fullscreen-button-corner-0">
                      <use className="ytp-svg-shadow"></use>
                      <path
                        className="ytp-svg-fill"
                        d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z"
                        id="ytp-id-58"
                      ></path>
                    </g>
                    <g className="ytp-fullscreen-button-corner-1">
                      <use className="ytp-svg-shadow"></use>
                      <path
                        className="ytp-svg-fill"
                        d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"
                        id="ytp-id-59"
                      ></path>
                    </g>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Video About Section */}
        <div className="w-full h-full flex flex-col">
          <h1
            className="text-[20px] font-semibold formatText my-3"
            dangerouslySetInnerHTML={{
              __html: TextFormatter(video?.videoName),
            }}
          />
          {/* Channel Info */}
          <div className="w-[1280px] h-auto flex items-center">
            <img
              src={video?.channelProfile}
              className="w-[40px] h-[40px] rounded-full"
            />
            <h1 className="flex flex-col justify-start ml-3 items-start h-auto w-auto">
              <span className="text-white font-semibold">
                {video?.channelName}
              </span>
              <span className="text-[#aaa] text-sm">{video?.view} abone</span>
            </h1>
            {/* Abone Ol Butonu */}
            <button
              className={`
            ${
              !isSub(user?.uid)
                ? "w-[150px] h-[40px] bg-white rounded-full flex text-black text-sm ml-7 px-2 hover:opacity-90 font-semibold items-center justify-center"
                : "flex w-[165px] h-[40px] rounded-full ml-7 bg-[#272727] text-sm font-semibold items-center justify-center hover:bg-[#3f3f3f]"
            }
          `}
              onClick={HandleSub}
            >
              {isSubTheChannel && (
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  className="style-scope yt-icon"
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

            <div className="w-[140px] h-[40px] ml-auto bg-[#272727] flex items-center justify-between rounded-full">
              {/* Like */}
              <button
                className="w-full h-full items-center justify-center flex gap-3 cursor-pointer hover:bg-[#3f3f3f] rounded-l-full"
                onClick={() => handleLike()}
              >
                {video?.like?.includes(user?.uid) ? (
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style={{
                      pointerEvents: "none",
                      width: "24px",
                      height: "24px",
                      rotate: "180deg",
                    }}
                  >
                    <g>
                      <path
                        fill="white"
                        d="M18,4h3v10h-3V4z M5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21c0.58,0,1.14-0.24,1.52-0.65L17,14V4H6.57 C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14z"
                      ></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style={{
                      pointerEvents: "none",
                      width: "24px",
                      height: "24px",
                      rotate: "180deg",
                    }}
                  >
                    <g>
                      <path
                        fill="white"
                        d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"
                      ></path>
                    </g>
                  </svg>
                )}
                {video?.like ? video?.like?.length : 0}
              </button>

              {/* Divider */}
              <div className="w-[1px] h-full bg-white/20"></div>

              {/* Dislike */}
              <button
                className="w-full h-full items-center justify-center flex gap-3 cursor-pointer hover:bg-[#3f3f3f] rounded-r-full"
                onClick={() => handleDislike()}
              >
                {video?.dislike ? video?.dislike?.length : 0}
                {video?.dislike?.includes(user?.uid) ? (
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style={{
                      pointerEvents: "none",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <g>
                      <path
                        fill="white"
                        d="M18,4h3v10h-3V4z M5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21c0.58,0,1.14-0.24,1.52-0.65L17,14V4H6.57 C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14z"
                      ></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    style={{
                      pointerEvents: "none",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <g>
                      <path
                        fill="white"
                        d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"
                      ></path>
                    </g>
                  </svg>
                )}
              </button>
            </div>
            <a
              href={video?.video}
              download
              className="w-[90px] h-[40px] ml-3 bg-[#272727] flex items-center justify-center rounded-full text-[14px] cursor-pointer hover:bg-[#3f3f3f] font-semibold"
            >
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                style={{
                  pointerEvents: "none",
                  width: "24px",
                  height: "24px",
                  marginRight: 5,
                }}
              >
                <g>
                  <path
                    fill="white"
                    d="M17 18V19H6V18H17ZM16.5 11.4L15.8 10.7L12 14.4V4H11V14.4L7.2 10.6L6.5 11.3L11.5 16.3L16.5 11.4Z"
                  ></path>
                </g>
              </svg>
              İndir
            </a>
          </div>

          <div className="w-[1280px] h-auto px-3 py-2 rounded-xl bg-[#272727] flex flex-col mt-5">
            <h1 className="text-sm font-semibold">
              {video?.view} görüntülenme -{" "}
              <span className="font-normal">
                {new Date(Number(video?.date)).toLocaleDateString()}
              </span>
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: TextFormatter(video?.description),
              }}
              className="text-sm py-5"
            />
          </div>

          {/* Comments */}
          <div className="w-[1280px] h-auto my-5 flex flex-col">
            <p>{video?.comments ? video?.comments?.length : 0} Yorum</p>
            <div className="flex w-full h-auto gap-3 mt-3">
              <img
                src={user?.photoURL}
                className="w-[40px] h-[40px] rounded-full"
              />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="w-full h-[25px] outline-none rounded-none border-b-[1px] border-r-0 border-l-0 border-t-0 pb-3 text-sm border-b-[rgba(255, 255, 255, 0.1)] p-0"
                placeholder="Yorum Ekleyin..."
              />
            </div>
            <div className="w-full p-0 m-0 flex items-center justify-end mb-5">
              <button
                onClick={() => {
                  set(
                    ref(database, `/videos/${id}/comments`),
                    video?.comments
                      ? [
                          ...video?.comments,
                          {
                            photoURL: user?.photoURL,
                            name: user?.displayName,
                            date: new Date().getTime(),
                            comment: comment,
                          },
                        ]
                      : [
                          ...[],
                          {
                            photoURL: user?.photoURL,
                            name: user?.displayName,
                            date: new Date().getTime(),
                            comment: comment,
                          },
                        ]
                  );
                  setComment("");
                  setUpdateData(!updateData);
                }}
                disabled={comment === ""}
                className="px-4 py-3 disabled:pointer-events-none disabled:opacity-25 bg-[#3ea6ff] text-black rounded-full text-sm hover:opacity-90"
              >
                Yorum Yap
              </button>
            </div>

            <div className="w-full h-auto flex flex-col gap-10 mb-20">
              {video?.comments?.map((comment, key) => {
                return (
                  <div
                    key={key}
                    className="w-full h-auto flex gap-3 items-center"
                  >
                    <img
                      src={comment?.photoURL}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <h1 className="w-full flex flex-col items-start justify-start h-auto">
                      <span className="text-[12px] font-semibold">
                        {comment?.name} -{" "}
                        <span className="font-normal text-xs text-[#aaaa]">
                          {new Date(Number(comment?.date)).toLocaleDateString()}
                        </span>
                      </span>
                      <span className="text-[14px] pt-1 w-full h-auto flex flex-wrap">
                        {comment?.comment}
                      </span>
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[170px] h-auto flex flex-col min-h-screen gap-4 pt-20">
        {Object.keys({ ...data?.videos }).map((video) => {
          return (
            <div
              className="flex gap-2 w-full h-[95px] cursor-pointer min-w-[300px]"
              onClick={() => navigate(`/Watch/${video}`)}
            >
              <div className="h-full min-w-[170px] rounded-xl relative">
                <img
                  src={data?.videos[video].banner}
                  className="h-full rounded-xl w-[170px] relative"
                />
                <p className="absolute right-1 bottom-1 text-white text-xs py-[3px] px-[4px] h-[24px] rounded-md bg-black">
                  50:17
                </p>
              </div>

              <div className="w-[300px] h-full max-h-[95px] flex flex-col">
                <h1 className="flex flex-wrap h-auto mb-3 w-full text-sm font-semibold text-white">
                  {data?.videos[video]?.videoName?.slice(0, 25)}
                </h1>

                <h1 className="flex flex-wrap w-[50px] text-xs font-medium text-[#aaa]">
                  {data?.videos[video].channelName}
                </h1>

                <p className="text-xs w-full pt-1 text-[#aaa] font-medium ">
                  {data?.videos[video].view} •{" "}
                  {new Date(
                    Number(data?.videos[video].date)
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watch;