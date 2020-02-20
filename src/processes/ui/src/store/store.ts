import { createStore,
         applyMiddleware, 
         Store,
         Action,
         Reducer, 
         compose }              from "redux";
import { createEpicMiddleware, 
         Epic }                 from "redux-observable";

import { api }                  from "watson-api";
import { loadArgs }             from "watson-core";

import { WatsonState,
         epicBuilder,
         reducerBuilder }       from "./state";


function storeBuilder<S>(
    name: string,
    reducerBuilder: (name: string, initialSettings: any) => Reducer<S>,
    epicBuilder:    (name: string, initialSettings: any) => Epic<Action, Action, S, any>,
    initialState: Partial<S>
): Store<Partial<S>> {
    const initialSettings = api.loadSettingsSync();
    const epic = epicBuilder(name, initialSettings);
    const reducer = reducerBuilder(name, initialSettings);
    const epicMiddleware = createEpicMiddleware<Action, Action, S, any>();

    let middleware;
    if (process.env.NODE_ENV === "development") {
        middleware = compose(
            applyMiddleware(epicMiddleware),
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : f => f
        );
    } else {
        middleware = applyMiddleware(epicMiddleware);
    }

    // TODO: Fix store type checks
    const store = createStore<any, any, any, any>(
        reducer,
        initialState,
        middleware
    );

    if (epic) {
        epicMiddleware.run(epic);
    }

    return store;
};

export default () => storeBuilder<WatsonState>(
    loadArgs().view,
    reducerBuilder,
    epicBuilder,
    {}
);
