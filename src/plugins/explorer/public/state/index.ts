import { FstState, 
         FstItem }                  from "watson-modules/fst-watcher";
import { TerminalModuleState }      from "watson-modules/terminal";

import { ExplorerModuleState }      from "../modules/explorer";
import { ContextMenuModuleState }   from "../modules/context-menu";


type WindowState = {
    folder: string;
    uuid: string;
}

type FormsState = {
    fstItem: FstItem;
}

type ExplorerState =
     ExplorerModuleState &
     ContextMenuModuleState &
     FstState &
     TerminalModuleState &
     WindowState &
     FormsState;

export default ExplorerState;
