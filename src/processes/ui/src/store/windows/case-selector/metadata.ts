import { WindowMetadata,
         ReDuckModule }         from "watson-core";

import { resizeModule }         from "watson-resize";
import { navigateModule }       from "watson-navigation";

import globalEpic               from "./epics";
import State                    from "./state";


const metadata: WindowMetadata<State> = {
    modules: [
        new ReDuckModule(resizeModule),
        new ReDuckModule(navigateModule),
    ],
    globalEpic
}

export default metadata;
