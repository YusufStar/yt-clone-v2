import React, { useCallback, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { createVideo } from "../FirebaseConfig";

const CreateVideoModalComp = ({
  setModal,
  uploadFiles,
  videoComplateDetail,
}) => {
  const [videoFile, setVideoFile] = useState(null);
  const [miniPic, setMiniPic] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoDesc, setVideoDesc] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setVideoFile(acceptedFiles[0]);
    setVideoName(acceptedFiles[0].name.replace(/\.[^/.]+$/, ""));
    uploadFiles(acceptedFiles[0], "video");
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4", ".MP4"],
    },
    multiple: false,
    disabled: videoFile,
  });

  function imageToUrl(image) {
    return URL.createObjectURL(image);
  }

  function BannerUpload(e) {
    setMiniPic(e.target.files[0]);
    uploadFiles(e.target.files[0], "banner");
  }

  return (
    <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center z-50 py-[50px] px-[500px]">
      <div className="w-auto h-auto rounded-xl bg-[#282828] z-[999] flex flex-col">
        {videoComplateDetail.videoProg === 100 ? (
          <>
            <div className="w-full h-auto py-2 flex pl-3 items-center justify-between">
              <h1 className="text-lg font-semibold">{videoName}</h1>

              <button
                className="w-12 h-12 flex items-center justify-center"
                onClick={() => setModal(false)}
              >
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
                      d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/20" />

            {/* Content */}
            <div className="w-full h-full p-10 flex flex-col gap-3">
              <h1 className="text-lg font-semibold">Ayrıntılar</h1>
              <label
                className={`p-0 px-4 ${
                  videoName === ""
                    ? "border-[#ff4e45] text-[#ff4e45]"
                    : "border-[#3ea5fe] text-[#3ea5fe]"
                } text-xs border-[1px] rounded-xl py-3 m-0 outline-none flex flex-col gap-2`}
              >
                Başlık
                <input
                  type="text"
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  className={`p-0 px-0 rounded-none border-none outline-none text-sm`}
                  placeholder="Videonuzu tanımlayan bir başlık girin. (zorunlu)"
                />
              </label>
              <label
                className={`p-0 px-4 ${
                  videoDesc === ""
                    ? "border-[#ff4e45] text-[#ff4e45]"
                    : "border-[#3ea5fe] text-[#3ea5fe]"
                } text-xs border-[1px] rounded-xl py-3 m-0 outline-none flex flex-col gap-2`}
              >
                Açıklama
                <textarea
                  type="text"
                  value={videoDesc}
                  onChange={(e) => setVideoDesc(e.target.value)}
                  className={`p-0 px-0 text-white rounded-none bg-transparent min-w-full max-w-full max-h-[250px] min-h-[100px] border-none outline-none text-sm`}
                  placeholder="Videonuzu tanımlayan bir başlık girin. (zorunlu)"
                />
              </label>
              <div className="flex flex-col gap-3 mb-auto">
                <p className="text-sm font-semibold">Küçük Resim</p>
                {miniPic ? (
                  <>
                    <img
                      src={imageToUrl(miniPic)}
                      className="w-[200px] h-[100px] rounded-xl"
                    />
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        document.getElementById("minipic").click();
                      }}
                      className="w-[200px] h-[100px] border-[1px] border-white flex items-center justify-center rounded-xl"
                    >
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
                        <g
                          version="1.1"
                          x="0px"
                          y="0px"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          enableBackground="new 0 0 24 24"
                        >
                          <path
                            fill="white"
                            d="M14,13.6l2.8,3.4h-5.4l0.3-0.4L14,13.6 M8.9,14.7l1.2,1.9l0.3,0.4H7.1L8.9,14.7 M14,12l-3,4l-2-3l-4,5h14L14,12L14,12z
	 M21,7h-2v2h-2V7h-2V5h2V3h2v2h2V7z M13,4v6v1h1h6v9H4V4H13 M14,3H3v18h18V10h-7V3L14,3z"
                          ></path>
                        </g>
                      </svg>
                      <input
                        onChange={(e) => BannerUpload(e)}
                        id="minipic"
                        type="file"
                        className="hidden"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </button>
                  </>
                )}
                <div
                  className={`h-[1px] w-[500px] relative bg-[#aaa] flex items-center`}
                >
                  <div
                    className="z-10 bg-[#FF0000] transition-all duration-150 h-full"
                    style={{ width: `${videoComplateDetail.bannerProg}%` }}
                  ></div>
                  <p className="absolute left-full px-2 text-xs">
                    {videoComplateDetail.bannerProg
                      ? videoComplateDetail.bannerProg
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="w-full h-auto py-2 px-2 flex items-center justify-end">
                <button
                  onClick={() => {
                    if (
                      videoComplateDetail.videoProg === 100 &&
                      videoComplateDetail.bannerProg === 100 &&
                      videoComplateDetail.videoUrl &&
                      videoComplateDetail.bannerUrl
                    ) {
                      createVideo(
                        videoComplateDetail.videoUrl,
                        videoComplateDetail.bannerUrl,
                        videoDesc,
                        videoName
                      );
                    }
                  }}
                  disabled={
                    videoComplateDetail.videoProg !== 100 &&
                    videoComplateDetail.bannerProg !== 100
                  }
                  className="bg-[#3ea6ff] px-3 py-2 rounded-md text-black text-md hover:opacity-80 font-semibold"
                >
                  Gönder
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-auto py-2 flex pl-3 items-center justify-between">
              <h1 className="text-lg font-semibold">Video Yükleyin</h1>

              <button
                className="w-12 h-12 flex items-center justify-center"
                onClick={() => setModal(false)}
              >
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
                      d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/20" />

            {/* Content */}
            <div
              className="w-full h-full p-10 flex flex-col items-center justify-center gap-3"
              {...getRootProps()}
            >
              <div className="w-auto h-auto p-10 flex items-center justify-center rounded-full cursor-pointer bg-black/20">
                <BsUpload className="fill-[#484848]" size={50} />
              </div>

              <h1 className="text-[15px] font-semibold">
                Video dosyalarını yüklemek için sürükleyin ve bırakın
              </h1>

              <div
                className={`h-[1px] w-[500px] relative bg-[#aaa] flex items-center`}
              >
                <div
                  className="z-10 bg-[#FF0000] transition-all duration-150 h-full"
                  style={{ width: `${videoComplateDetail.videoProg}%` }}
                ></div>
                <p className="absolute left-full px-2 text-xs">
                  {videoComplateDetail.videoProg
                    ? videoComplateDetail.videoProg
                    : 0}
                  %
                </p>
              </div>

              <div className="px-5 py-2 bg-[#3ea6ff] rounded-md mt-3 z-[9999] cursor-pointer">
                <button
                  disabled={videoComplateDetail.videoProg !== 100}
                  {...getInputProps()}
                  className="disabled:opacity-50 pointer-events-none"
                ></button>
                Dosya Seç
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateVideoModalComp;