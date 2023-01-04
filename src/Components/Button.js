import React from "react";

const Button = ({ Icon, title, onClickEvent }) => {
  return (
    <button
      onClick={onClickEvent}
      title={title}
      className={`w-[40px] h-[40px] bg-transparent flex items-center justify-center rounded-full hover:bg-[#303030] mr-2`}
    >
      <Icon />
    </button>
  );
};

export default Button;