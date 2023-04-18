import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../context/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [mystream, SetMystream] = useState();
  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
    console.log(`Email ${email} joined room`);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    SetMystream(stream);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined");
    };
  }, [socket, handleUserJoined]);
  return (
    <div>
      <h1>Room page</h1>
      <h4>{remoteSocketId ? "connected" : "not connected"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      <>
        <h1>My Stream</h1>
        {mystream && (
          <ReactPlayer
            playing
            muted
            height="500px"
            width="400px"
            url={mystream}
          />
        )}
      </>
    </div>
  );
};

export default Room;
