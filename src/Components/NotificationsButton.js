import React from "react";
import Button from "./Button";
import NotificationModalComp from "./NotificationModalComp";

const NotificationsButton = ({ NotificationModal, SetNotificationModal, notificationCount }) => {
  return (
    <div className="relative">
      {NotificationModal && <NotificationModalComp />}
      <Button
        onClickEvent={() => SetNotificationModal(!NotificationModal)}
        Icon={() => {
          return (
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
                  d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"
                ></path>
              </g>
            </svg>
          );
        }}
      />
      {/* Not. Count */}
      <div className="w-4 h-4 absolute bg-[#c00] right-3 top-1 rounded-full flex items-center justify-center">
        <p className="text-sm text-white">{notificationCount}</p>
      </div>
    </div>
  );
};

export default NotificationsButton;