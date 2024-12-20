import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import { Chat } from "../api/chat/chat.model";
import { IRoom } from "../api/room/room.interface";
import { Room } from "../api/room/room.model";
import { User } from "../api/user/user.model";
import { IMessage } from "../types";

let io: Server | null = null;

export const initSocketIO = (server: HTTPServer): Server => {
  io = new Server(server, {
    cors: {
      origin: "*", // Frontend domain
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`⚡️ User connected: ${socket.id}`);

    socket.on("join-notification", (userId: string) => {
      socket.join(`notification-${userId}`);
      console.log(`User ${userId} subscribed to notifications`);
    });

    socket.on("join-chat-notification", (userId: string) => {
      socket.join(`chat-notification-${userId}`);
      console.log(`User ${userId} subscribed to chat notifications`);
    });

    socket.on("join-room", (roomId: string) => {
      socket.join(`room-${roomId}`);
      console.log(`User has join roomNo:${roomId}`);
    });

    socket.on("join-chats", (userId: string) => {
      socket.join(`chats-${userId}`);
      console.log(`User has on chats userId:${userId}`);
    });

    socket.on("mark-as-read", async (roomId: IRoom, userId: string) => {
      await Room.findByIdAndUpdate(
        roomId?._id,
        {
          ...((roomId.user1 as any) === userId
            ? { unreadCount1: 0 }
            : {
                unreadCount2: 0,
              }),
        },
        { new: true }
      );
    });

    socket.on("user-online", async (userId: string) => {
      await User.findByIdAndUpdate(userId, { isOnline: true });
      socket.broadcast.emit("user-status-changed", { userId, isOnline: true });
    });

    socket.on("user-offline", async (userId: string) => {
      const data = {
        isOnline: false,
        lastSeen: new Date().toISOString(),
      };

      await User.findByIdAndUpdate(userId, data);
      socket.broadcast.emit("user-status-changed", { userId, ...data });
    });

    socket.on("send-message", async (message: IMessage) => {
      const [chat, room] = await Promise.all([
        new Chat({ ...message.chat, roomId: message.room._id }).save(),
        Room.findByIdAndUpdate(
          message.room?._id,
          {
            lastMessage: message.chat.text,
            ...(message.room.user1 === message.chat.senderId && {
              $inc: { unreadCount2: 1 },
            }),
            ...(message.room.user2 === message.chat.senderId && {
              $inc: { unreadCount1: 1 },
            }),
          },
          { new: true }
        ).populate([
          { path: "user1", select: "fullName photo isOnline lastSeen" },
          { path: "user2", select: "fullName photo isOnline lastSeen" },
        ]),
      ]);

      const data = {
        room,
        chat: await chat.populate([
          { path: "senderId", select: "fullName photo" },
          { path: "receiverId", select: "fullName photo" },
        ]),
      };

      // console.log("🚀 ~ socket.on ~ data:", data);

      getIO().to(`chats-${message.chat.receiverId}`).emit("new-chats", room);
      getIO().to(`room-${room?._id}`).emit("new-message", data);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized!");
  return io;
};
