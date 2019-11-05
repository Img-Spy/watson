import { Action }                   from "redux-actions";
import { combineEpics,
         ofType }                   from "redux-observable";
import { switchMap,
         map }                      from "rxjs/operators";

import { ActionEpic }               from "watson-core";
import { terminalActions }          from "watson-modules/terminal";
import { ExportCsvObservable,
         ExportCsvData,
         exportTypes }              from "watson-modules/export";

import State                        from "../state";


const exportCsv: ActionEpic<ExportCsvData, State> = (
    action$, state$
) => action$.pipe(
    ofType(exportTypes.EXPORT_CSV),
    switchMap(action => ExportCsvObservable.create(action.payload)),
    map(action => terminalActions.pushLine({
        level: "notice",
        text: `Exported CSV file "${action.file}".`
    }))
);

export default combineEpics(
    exportCsv,
);
