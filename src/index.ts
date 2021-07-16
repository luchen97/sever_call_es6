import { config } from "./config";
import { nodeServer } from "./servers/nodeServernew";
import { initSocketServer } from "./servers/socketnew";
import { initWorker } from "./workerManager";

const httpsServer = nodeServer().httpsServer;
const socketServer = initSocketServer(httpsServer);
httpsServer.listen(config.listenPort, async () => {
    console.log("listening http " + config.listenPort);
});

const main = async () => {
    await initWorker();
};
main();

export { socketServer };
