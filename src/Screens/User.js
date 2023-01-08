import React from "react";
import { useParams } from "react-router-dom";
import {Channels} from "../Data"

const User = () => {
  const { id } = useParams();
  const userOrChannel = Channels.find((channel) => channel.name === id)
  return <div className="bg-gray-800 h-screen">
    <h1 className="text-black">channel Id: {userOrChannel.id}</h1>
  </div>;
};

export default User;