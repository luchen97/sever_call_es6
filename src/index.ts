import { config } from "./config";
import { nodeServer } from "./servers/nodeServer";
import { initSocketServer } from "./servers/socket";
import { initWorker } from "./workerManager";

const httpsServer = nodeServer().httpsServer;
const socketServer = initSocketServer(httpsServer);
httpsServer.listen(config.listenPort, async () => {
  console.log("listening http " + config.listenPort);
});

const main = async () => {
  await initWorker();
};
main()
