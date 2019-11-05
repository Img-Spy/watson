import ExplorerState            from "watson-plugin-explorer/public/state";
import { SettingsModuleState }  from "watson-modules/settings";

import { SearchModuleState }    from "../modules/search";


type SearchState = SettingsModuleState & ExplorerState & SearchModuleState;

export default SearchState;
