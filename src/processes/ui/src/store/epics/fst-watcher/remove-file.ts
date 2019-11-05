import { filter,
         map }                      from "rxjs/operators";
import { ofType }                   from "redux-observable";

import { ActionEpic }               from "watson-core";
import { settingsActions }          from "watson-modules/settings";
import { FstUnlinkPayload,
         fstWatcherTypes }          from "watson-modules/fst-watcher";

import State                        from "./state";


type Input = FstUnlinkPayload;
const removeFileEpic: ActionEpic<Input, State> = (
    action$, state$
) => action$.pipe(
    ofType(fstWatcherTypes.UNLINK),
    filter((action) => {
        const state = state$.value;
        const dataSource = state.settings.sources[action.payload.path];
        return !!dataSource;
    }),
    map((action) => settingsActions.deleteSource(action.payload.path))
);

export default removeFileEpic;
