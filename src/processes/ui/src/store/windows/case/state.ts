import { FormState }            from "react-redux-form";

import { SettingsModel }        from "watson-core";

import { NavigateModuleState }  from "watson-navigation";
import { ResizeModuleState }    from "watson-resize";
import { FstState,
         FstItem }              from "watson-modules/fst-watcher";
import { TerminalModel }        from "watson-modules/terminal";
import { WindowsModelState }    from "watson-modules/windows";


type CaseState =
    NavigateModuleState &
    WindowsModelState &
    ResizeModuleState &
    FstState & {
    terminal: TerminalModel;

    settings: SettingsModel;

    folder: string;
    windowId: string;

    // Forms
    fstItem: FstItem;
    searchForm: any;

    forms: {
        fstItem: { $form: FormState };
        searchForm: { $form: FormState };
    }
}

export default CaseState;
