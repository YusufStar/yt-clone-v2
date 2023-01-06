import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navList = [
  {
    active: () => {
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
            <path fill="white" d="M4,10V21h6V15h4v6h6V10L12,3Z"></path>
          </g>
        </svg>
      );
    },
    inactive: () => {
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
              d="M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z"
            ></path>
          </g>
        </svg>
      );
    },
    title: "Ana Sayfa",
    currentPage: (pathname) => {
      return pathname === "/" || pathname === "/Search";
    },
    path: "/",
  },
  {
    active: () => {
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
              d="M20,7H4V6h16V7z M22,9v12H2V9H22z M15,15l-5-3v6L15,15z M17,3H7v1h10V3z"
            ></path>
          </g>
        </svg>
      );
    },
    inactive: () => {
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
              d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z"
            ></path>
          </g>
        </svg>
      );
    },
    title: "Abonelikler",
    currentPage: (pathname) => {
      return pathname === "/Subscriptions";
    },
    path: "/Subscriptions",
  },
  {
    active: () => {
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
              d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,2C8.73,2,5.8,3.44,4,5.83V3.02H2V9h6V7H5.62 C7.08,5.09,9.36,4,12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8H2c0,5.51,4.49,10,10,10s10-4.49,10-10S17.51,2,12,2z"
            ></path>
          </g>
        </svg>
      );
    },
    inactive: () => {
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
              d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z"
            ></path>
          </g>
        </svg>
      );
    },
    title: "Geçmiş",
    currentPage: (pathname) => {
      return pathname === "/History";
    },
    path: "/History",
  },
  {
    active: () => {
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
              d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M14.97,16.95L10,13.87V7h2v5.76 l4.03,2.49L14.97,16.95z"
            ></path>
          </g>
        </svg>
      );
    },
    inactive: () => {
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
              d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"
            ></path>
          </g>
        </svg>
      );
    },
    title: "Daha sonra izle",
    currentPage: (pathname) => {
      return pathname === "/Playlist";
    },
    path: "/Playlist",
  },
  {
    active: () => {
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
              d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"
            ></path>
          </g>
        </svg>
      );
    },
    inactive: () => {
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
              d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"
            ></path>
          </g>
        </svg>
      );
    },
    title: "Beğendiğin Videolar",
    currentPage: (pathname) => {
      return pathname === "/Likes";
    },
    path: "/Likes",
  },
];

const SideBar = () => {
  const currentPage = useLocation();
  return (
    <div className="w-[240px] pr-5 pl-3 flex flex-col pt-3 gap-2 h-full bg-[#0f0f0f]">
      {navList.map((item, idx) => {
        return (
          <Item
            currentPageFunc={() => item.currentPage(currentPage.pathname)}
            Icon={
              item.currentPage(currentPage.pathname)
                ? item.active
                : item.inactive
            }
            title={item.title}
            path={item.path}
            key={idx}
          />
        );
      })}
    </div>
  );
};

const Item = ({ Icon, title, currentPageFunc, path }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`w-full h-[45px] items-center pl-3 flex gap-3 rounded-xl ${
        currentPageFunc() ? "bg-[#272727]" : ""
      }`}
      onClick={() => navigate(path)}
    >
      <Icon />
      <h1 className={`text-white text-[14px] ${currentPageFunc() ? "font-semibold" : ""}`}>
        {title}
      </h1>
    </button>
  );
};

export default SideBar;