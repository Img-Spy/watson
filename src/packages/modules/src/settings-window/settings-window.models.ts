import { DataSource }   from "watson-core";


export { DataSource }   from "watson-core";

export interface SettingsWindowModel {
    sources: {
        selectedSource?: DataSource;
    };
}

export interface SettingsWindowState {
    settingsWindow: SettingsWindowModel;
}
