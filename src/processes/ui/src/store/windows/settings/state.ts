import { FormState }            from "react-redux-form";

import { SettingsModel, 
         DataSourceForm }       from "watson-core";
import { NavigateModuleState }  from "watson-navigation";
import { ResizeModuleState }    from "watson-resize";
import { FstState }             from "watson-modules/fst-watcher";
import { SettingsWindowState }  from "watson-modules/settings-window";
import { WindowsModelState }    from "watson-modules/windows";


type SettingsState =
    NavigateModuleState &
    SettingsWindowState &
    WindowsModelState &
    FstState &
    ResizeModuleState & {

    // Forms
    settings: SettingsModel;
    dataSource: DataSourceForm;

    forms: {
        settings: { $form: FormState },
        dataSource: { $form: FormState }
    };
}

export default SettingsState;
