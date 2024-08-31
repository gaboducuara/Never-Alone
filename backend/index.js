import http from "http";
import { configuration } from "./app/config.js";
import { app } from "./app/index.js";
import { connect } from "./app/database.js";
import { Server } from "socket.io";

const { port } = configuration.server;

// Connect to the database
connect();

// Create the server
const server = http.createServer(app);

// create the sockets server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// listen for connections

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("message", (message) => {
    console.log(`Message: ${message}`);
    io.emit("message", message);
  });
});

server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
