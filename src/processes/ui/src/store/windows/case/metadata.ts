import { WindowMetadata,
         ReDuckModule,
         SimpleModule,
         ReducerModule,
         FormModule }           from "watson-core";

import { resizeModule }         from "watson-resize";
import { navigateModule }       from "watson-navigation";
import * as fstWatcherModule    from "watson-modules/fst-watcher";
import * as terminalModule      from "watson-modules/terminal";
import * as settingsModule      from "watson-modules/settings";
import * as exportModule        from "watson-modules/export";
import * as windowsModule       from "watson-modules/windows";

import globalEpic               from "./epics";
import State                    from "./state";


const metadata: WindowMetadata<State> = {
    modules: [
        new ReDuckModule(resizeModule),
        new ReDuckModule(navigateModule),
        new ReDuckModule(fstWatcherModule),
        new ReDuckModule(terminalModule),
        new ReDuckModule(settingsModule),
        // new ReDuckModule(exportModule),
        new ReDuckModule(windowsModule),

        new SimpleModule("folder", i => i.args["folder"]),
        new SimpleModule("windowId", i => i.args.uuid),

        // Forms
        new FormModule("fstItem",    {}),
        new FormModule("searchForm", {}),
    ],
    globalEpic
}

export default metadata;
