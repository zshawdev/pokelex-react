import { createServer, Server } from "http";
import app from "./app";
import config from "./config";
import getPokeList from "./pokeapi";

let server: Server;

async function main() {
  getPokeList().then(res => {
    console.info(`Loaded ${res.length} pokemon!`);
  });
  server = createServer(app);
  server.listen(config.port, () =>
    console.log(`Server listening to port ${config.port}`)
  );
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const errorHandler = (error: Error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM Received");
  if (server) {
    server.close();
  }
});

main();
