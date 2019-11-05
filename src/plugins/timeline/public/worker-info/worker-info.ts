import { WorkerInfo }       from "watson-core";

import BackgroundMethods    from "./methods";

const workerInfo = new WorkerInfo<BackgroundMethods>("TimelineWorker");

export default workerInfo;
