const http = require("http");
const socket = require("socket.io");
const moment = require("moment");
const app = require("./app");

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (message) => {
    io.emit("message", {
      ...message,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

function bootstrap() {
  server.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

bootstrap();
