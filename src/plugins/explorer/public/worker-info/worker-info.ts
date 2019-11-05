import { WorkerInfo }       from "watson-core";

import BackgroundMethods    from "./methods";

const workerInfo = new WorkerInfo<BackgroundMethods>("ExplorerWorker");

export default workerInfo;
