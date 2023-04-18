import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocket = ()=> {
   return useContext(SocketContext);

}

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("localhost:3000"), []);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
