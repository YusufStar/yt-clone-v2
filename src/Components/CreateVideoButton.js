import React from "react";
import Button from "./Button";
import CreateVideoModalComp from "./CreateVideoModalComp";

const CreateVideoButton = ({ SetCreateVideoModal, CreateVideoModal }) => {
  return (
    <div className="relative">
      <Button
        onClickEvent={() => SetCreateVideoModal(!CreateVideoModal)}
        Icon={() => {
          return (
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              className=""
              style={{
                pointerEvents: "none",
                width: "24px",
                height: "24px",
              }}
            >
              <g className="">
                <path
                  fill="white"
                  d="M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z M17,6H3v12h14v-6.39l4,1.83V8.56l-4,1.83V6 M18,5v3.83L22,7v8l-4-1.83V19H2V5H18L18,5 z"
                  className=""
                ></path>
              </g>
            </svg>
          );
        }}
      />
    </div>
  );
};

export default CreateVideoButton;