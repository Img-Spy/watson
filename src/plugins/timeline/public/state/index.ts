import { SettingsModuleState }  from "watson-modules/settings";
import ExplorerState            from "watson-plugin-explorer/public/state";

import { TimelineModuleState }  from "../modules/timeline";


type TimelineState = SettingsModuleState & ExplorerState & TimelineModuleState;

export default TimelineState;
