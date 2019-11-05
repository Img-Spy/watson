import { Action }               from "redux-actions";
import { ofType }               from "redux-observable";
import { map, filter }          from "rxjs/operators";

import { ActionEpic }           from "watson-core";
import { apiQuery }             from "watson-api";

import { WindowsModelState }    from "../windows.models";
import types                    from "../windows.types";


const closeModalEpic: ActionEpic<undefined, WindowsModelState> = (
    action$, state$
) => action$.pipe(
    ofType(types.CLOSE_MODAL),
    apiQuery(api => api.closeWindow("settings")),
    map(() => undefined), // do nothing
);

export default closeModalEpic;
