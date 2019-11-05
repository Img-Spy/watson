import { WindowMetadata, 
         ReDuckModule,
         FormModule, 
         SimpleModule }             from "watson-core";

import settingsReducer              from "watson-modules/settings";

import { resizeModule }             from "watson-resize";
import { navigateModule }           from "watson-navigation";
import * as settingsWindowModule    from "watson-modules/settings-window";
import * as windowsModule           from "watson-modules/windows";

import globalEpic                   from "./epics";
import State                        from "./state";


const metadata: WindowMetadata<State> = {
    modules: [
        new ReDuckModule(resizeModule),
        new ReDuckModule(navigateModule),
        new ReDuckModule(settingsWindowModule),
        new ReDuckModule(windowsModule),

        // Forms
        new FormModule("settings", i => settingsReducer(i)),
    ],
    globalEpic
}

export default metadata;
