import { Socket } from "socket.io";

const {createServer,http} = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Ensure this matches your client origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket:Socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.emit("message", "Hello from server");
});

httpServer.listen(8080, () => {
  console.log("Socket.IO server running on http://localhost:8080/");
});
