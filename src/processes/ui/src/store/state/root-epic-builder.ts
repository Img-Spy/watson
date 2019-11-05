import { Action }                   from "redux";
import { combineEpics,
         Epic }                     from "redux-observable";

import { loadArgs,
         StartupInfo,
         WindowMetadata }           from "watson-core";
import { api }                      from "watson-api";

import { WatsonState }              from "./watson-state";

import { viewPlugins }              from "plugins";
import windowsMetadata              from "store/windows";


function buildWindowEpics(
    windowName: string, info: StartupInfo
): Epic<Action, Action, WatsonState>[] {
    const windowMetadata: WindowMetadata<WatsonState> =
        windowsMetadata[windowName];
    const epics = windowMetadata.modules
        .reduce((epics, m, i) => m.mergeEpic(epics, info), [])

    if(windowMetadata.globalEpic) {
        epics.push(windowMetadata.globalEpic);
    }

    // return [];
    return epics;
}

function buildPluginEpics(
    windowName: string,
    info: StartupInfo
): Epic<Action, Action, WatsonState>[] {
    if(windowName !== "case") return [];

    const globalEpics: any[] = viewPlugins
        .filter(p => p.view.globalEpic)
        .map(p => p.view.globalEpic);

    return globalEpics;
}


export default function rootEpicBuilder(
    name: string
): Epic<Action, Action, WatsonState, any>  {
    const args = loadArgs();
    const info: StartupInfo = { initialSettings: api.loadSettingsSync(), args };
    const epics = [
        ...buildWindowEpics(name, info),
        ...buildPluginEpics(name, info),
    ];

    return combineEpics.apply(this, epics)
};
