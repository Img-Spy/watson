import { actions as formActions }   from "react-redux-form";
import { ofType }                   from "redux-observable";
import { mapTo }                    from "rxjs/operators";

import { ActionEpic }               from "watson-core";
import { DataSource, 
         settingsTypes }            from "watson-modules/settings";

import State                        from "./state"


const deleteSourceEpic: ActionEpic<DataSource, State> = (
    action$, state$
) => action$.pipe(
    ofType(settingsTypes.DELETE_SOURCE),
    // TODO: Fix this any
    mapTo(formActions.setTouched("settings") as any)
);

export default deleteSourceEpic;
