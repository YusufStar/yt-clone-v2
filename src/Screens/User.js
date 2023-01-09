import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../FirebaseConfig";

const User = () => {
  const { id } = useParams();
  const [userOrChannel, setUserOrChannel] = useState(null)

  useEffect(() => {
    const dbref = ref(database);
    get(child(dbref, `/Channels`)).then((snap) => {
      const val = snap.val()
      if (snap.exists()) {
        const finduser = Object.keys(val).find((usr) => {
          return val[usr].name === id
        })
        setUserOrChannel(val[finduser])
      }
    });
  }, []);

  return <div className="bg-gray-800 h-screen">
    <h1 className="text-black">channel Id: {userOrChannel?.id}</h1>
  </div>;
};

export default User;