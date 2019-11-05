import { combineReducers,
         Reducer, 
         ReducersMapObject }        from "redux";

import { loadArgs,
         WindowMetadata,
         StartupInfo }              from "watson-core";
import { api }                      from "watson-api";

import { WatsonState }              from "./watson-state";

import { viewPlugins }              from "plugins";
import windowsMetadata              from "store/windows";


function buildWindowReducerMap(
    windowName: string, info: StartupInfo
): ReducersMapObject {
    const windowMetadata: WindowMetadata<WatsonState> = 
        windowsMetadata[windowName];

    return windowMetadata.modules
        .reduce((map, curr, i) => curr.mergeReducer(map, info), {});
}

function buildPluginReducerMap(windowName: string, info: StartupInfo): ReducersMapObject {
    if(windowName !== "case") return {};

    return viewPlugins.reduce(
        (map, plugin) => plugin.view.modules.reduce(
            (map, m) => m.mergeReducer(map, info),
            map),
        {});
}

export default function rootReducerBuilder(
    windowName: string
): Reducer<WatsonState>  {
    const args = loadArgs();
    const info: StartupInfo = { initialSettings: api.loadSettingsSync(), args };
    const windowReducerMap = buildWindowReducerMap(windowName, info);
    const pluginReducerMap = buildPluginReducerMap(windowName, info);

    // FIXME: Incorrect types!
    return combineReducers<any>({
        ...pluginReducerMap,
        ...windowReducerMap
    });
};
