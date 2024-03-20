/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2023-12-16 12:40:25
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2024-02-07 12:58:21
 * @FilePath: /1s/server/websocket/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by 1s, All Rights Reserved. 
 */
import { createServer } from "http";
import { Server, Socket } from "socket.io";


export function initWebsocket(server){
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  

  io.on("connection", function (socket) {  
  });


  // 调试用
  globalThis.socketio = io

  return io
}



